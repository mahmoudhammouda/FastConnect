import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

/**
 * Intercepteur HTTP qui ajoute automatiquement le token JWT aux requêtes
 * et gère le rafraîchissement du token expiré
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {}

  /**
   * Intercepter les requêtes HTTP et ajouter le token JWT
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Ajouter le token à la requête si disponible
    const token = this.authService.token;
    request = this.addTokenHeader(request, token);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Gérer l'erreur 401 (Unauthorized)
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Ne pas tenter de rafraîchir le token pour les requêtes d'authentification
          if (request.url.includes('/auth/login') || 
              request.url.includes('/auth/register') || 
              request.url.includes('/auth/refresh-token')) {
            return throwError(() => error);
          }
          
          return this.handle401Error(request, next);
        }
        
        return throwError(() => error);
      })
    );
  }

  /**
   * Ajouter le token JWT à l'en-tête d'autorisation
   */
  private addTokenHeader(request: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }

  /**
   * Gérer l'erreur 401 (Unauthorized) en essayant de rafraîchir le token
   */
  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.authService.currentAuthState.refreshToken;

      if (refreshToken) {
        return this.authService.refreshToken(refreshToken).pipe(
          switchMap((response) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(response.token);
            
            // Réessayer la requête originale avec le nouveau token
            return next.handle(this.addTokenHeader(request, response.token));
          }),
          catchError((error) => {
            this.isRefreshing = false;
            
            // En cas d'échec du rafraîchissement, déconnecter l'utilisateur
            this.authService.logout().subscribe();
            return throwError(() => error);
          })
        );
      } else {
        // Pas de token de rafraîchissement, déconnecter l'utilisateur
        this.isRefreshing = false;
        this.authService.logout().subscribe();
        return throwError(() => new Error('Session expirée, veuillez vous reconnecter'));
      }
    } else {
      // Si un rafraîchissement est déjà en cours, attendre qu'il soit terminé
      // et réessayer la requête avec le nouveau token
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          return next.handle(this.addTokenHeader(request, token));
        })
      );
    }
  }
}