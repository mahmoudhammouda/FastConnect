import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * Intercepteur HTTP pour gérer l'ajout du token JWT et le rafraîchissement automatique
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {}

  /**
   * Intercepter les requêtes HTTP pour ajouter le token JWT et gérer les erreurs d'authentification
   * @param request Requête HTTP originale
   * @param next Handler de la requête
   * @returns Observable de l'événement HTTP
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Vérifier si la requête doit éviter l'ajout du token
    if (this.shouldSkipAuthHeader(request)) {
      return next.handle(request);
    }

    // Récupérer le token JWT actuel
    const token = this.authService.token;

    // Ajouter le token JWT à la requête si disponible
    if (token) {
      request = this.addToken(request, token);
    }

    // Traiter la requête
    return next.handle(request).pipe(
      catchError(error => {
        // Gérer les erreurs 401 (Non autorisé)
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  /**
   * Décider si la requête doit éviter l'ajout du header d'authentification
   * @param request Requête HTTP
   * @returns Booléen indiquant si l'on doit sauter l'ajout du header
   */
  private shouldSkipAuthHeader(request: HttpRequest<unknown>): boolean {
    // Les requêtes d'authentification ne doivent pas ajouter le token
    const url = request.url.toLowerCase();
    return (
      url.includes('/auth/login') ||
      url.includes('/auth/register') ||
      url.includes('/auth/linkedin') ||
      url.includes('/auth/refresh-token')
    );
  }

  /**
   * Ajouter le token JWT à l'en-tête Authorization de la requête
   * @param request Requête HTTP originale
   * @param token Token JWT
   * @returns Requête HTTP avec le token
   */
  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * Gérer les erreurs 401 (Non autorisé) en tentant de rafraîchir le token
   * @param request Requête HTTP originale
   * @param next Handler de la requête
   * @returns Observable de l'événement HTTP
   */
  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.authService.currentAuthState.refreshToken;

      if (refreshToken) {
        return this.authService.refreshToken(refreshToken).pipe(
          switchMap(response => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(response.token);
            return next.handle(this.addToken(request, response.token));
          }),
          catchError(error => {
            this.isRefreshing = false;
            this.authService.logout();
            return throwError(() => error);
          }),
          finalize(() => {
            this.isRefreshing = false;
          })
        );
      } else {
        // Pas de refresh token, forcer la déconnexion
        this.isRefreshing = false;
        this.authService.logout();
        return throwError(() => new Error('Session expirée.'));
      }
    } else {
      // Si un rafraîchissement est déjà en cours, attendre qu'il soit terminé
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addToken(request, token as string)))
      );
    }
  }
}