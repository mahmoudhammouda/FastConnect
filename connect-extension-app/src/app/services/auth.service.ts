import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { 
  User, 
  EmailAuthCredentials, 
  LinkedInProfile, 
  UserRegistration, 
  UserOnboarding, 
  AuthResponse, 
  AuthState, 
  RefreshTokenRequest,
  UserRole,
  LinkedInAuthUrlResponse
} from '../models/user.model';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

/**
 * Service d'authentification pour gérer la connexion/déconnexion et les sessions utilisateur
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_DATA_KEY = 'auth_data';
  private readonly API_URL = environment.apiUrl;
  private readonly IS_EXTENSION = environment.isExtension;

  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
    tokenExpiration: null
  });

  public authState$ = this.authStateSubject.asObservable();

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.loadAuthState();
    console.log('Auth Service initialisé');
  }

  /**
   * Obtenir l'état d'authentification actuel
   */
  get currentAuthState(): AuthState {
    return this.authStateSubject.value;
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  get isAuthenticated(): boolean {
    return this.currentAuthState.isAuthenticated && !this.isTokenExpired();
  }

  /**
   * Obtenir l'utilisateur actuellement connecté
   */
  get currentUser(): User | null {
    return this.currentAuthState.user;
  }

  /**
   * Obtenir le token JWT actuel
   */
  get token(): string | null {
    if (this.isTokenExpired()) {
      return null;
    }
    return this.currentAuthState.token;
  }

  /**
   * Authentification avec email et mot de passe
   * @param credentials Informations d'authentification (email, mot de passe)
   */
  loginWithEmail(credentials: EmailAuthCredentials): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('auth/login', credentials)
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        catchError(error => {
          console.error('Erreur lors de la connexion:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Authentification avec LinkedIn
   * @param profile Profil LinkedIn
   */
  loginWithLinkedIn(profile: LinkedInProfile): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('auth/linkedin', profile)
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        catchError(error => {
          console.error('Erreur lors de la connexion avec LinkedIn:', error);
          return throwError(() => error);
        })
      );
  }
  
  /**
   * Obtenir l'URL de redirection pour l'authentification LinkedIn
   * @returns Observable contenant l'URL de redirection LinkedIn
   */
  getLinkedInAuthUrl(): Observable<LinkedInAuthUrlResponse> {
    return this.apiService.get<LinkedInAuthUrlResponse>('auth/linkedin/redirect')
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération de l\'URL LinkedIn:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Inscription d'un nouvel utilisateur
   * @param user Données de l'utilisateur à inscrire
   */
  register(user: UserRegistration): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('auth/register', user)
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        catchError(error => {
          console.error('Erreur lors de l\'inscription:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Compléter l'onboarding de l'utilisateur (choix de rôle, etc.)
   * @param onboardingData Données d'onboarding
   */
  completeOnboarding(onboardingData: UserOnboarding): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('auth/onboarding', onboardingData)
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        catchError(error => {
          console.error('Erreur lors de l\'onboarding:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Rafraîchir le token JWT
   * @param refreshToken Token de rafraîchissement
   */
  refreshToken(refreshToken: string): Observable<AuthResponse> {
    const request: RefreshTokenRequest = { refreshToken };
    return this.apiService.post<AuthResponse>('auth/refresh-token', request)
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        catchError(error => {
          console.error('Erreur lors du rafraîchissement du token:', error);
          // En cas d'échec, déconnecter l'utilisateur
          this.logout();
          return throwError(() => error);
        })
      );
  }

  /**
   * Vérifier si l'utilisateur a besoin de compléter l'onboarding
   */
  needsOnboarding(): boolean {
    const user = this.currentUser;
    return !!user && !user.onboardingCompleted;
  }

  /**
   * Obtenir le rôle de l'utilisateur actuel
   */
  getUserRole(): UserRole | null {
    const user = this.currentUser;
    return user ? user.role : null;
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logout(): Observable<boolean> {
    // Appel à l'API pour invalider le token côté serveur (optionnel)
    return this.apiService.post<boolean>('auth/logout', {}).pipe(
      tap(() => {
        this.clearAuthState();
      }),
      catchError(error => {
        console.error('Erreur lors de la déconnexion:', error);
        // Même en cas d'erreur, on efface les données d'authentification côté client
        this.clearAuthState();
        return throwError(() => error);
      })
    );
  }

  /**
   * Vérifier si le token JWT est expiré
   */
  private isTokenExpired(): boolean {
    const expiration = this.currentAuthState.tokenExpiration;
    if (!expiration) {
      return true;
    }
    return expiration < new Date();
  }

  /**
   * Traiter la réponse de l'authentification
   * @param response Réponse d'authentification de l'API
   */
  private handleAuthResponse(response: AuthResponse): void {
    if (response && response.success) {
      const expirationDate = new Date(response.expiration);
      const authState: AuthState = {
        isAuthenticated: true,
        user: response.user,
        token: response.token,
        refreshToken: response.refreshToken,
        tokenExpiration: expirationDate
      };
      this.saveAuthState(authState);
      this.authStateSubject.next(authState);
    }
  }

  /**
   * Sauvegarder l'état d'authentification dans le localStorage
   */
  private saveAuthState(authState: AuthState): void {
    try {
      const state = {
        ...authState,
        tokenExpiration: authState.tokenExpiration ? authState.tokenExpiration.toISOString() : null
      };
      localStorage.setItem(this.AUTH_DATA_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données d\'authentification:', error);
    }
  }

  /**
   * Charger l'état d'authentification depuis le localStorage
   */
  private loadAuthState(): void {
    try {
      const storedState = localStorage.getItem(this.AUTH_DATA_KEY);
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        const authState: AuthState = {
          isAuthenticated: parsedState.isAuthenticated,
          user: parsedState.user,
          token: parsedState.token,
          refreshToken: parsedState.refreshToken,
          tokenExpiration: parsedState.tokenExpiration ? new Date(parsedState.tokenExpiration) : null
        };
        
        // Vérifier si le token est expiré
        if (authState.isAuthenticated && this.isTokenExpired()) {
          // Si le token est expiré, tenter de le rafraîchir automatiquement
          const refreshToken = authState.refreshToken;
          if (refreshToken) {
            this.refreshToken(refreshToken).subscribe({
              error: () => this.clearAuthState()
            });
          } else {
            this.clearAuthState();
          }
        } else {
          this.authStateSubject.next(authState);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données d\'authentification:', error);
      this.clearAuthState();
    }
  }

  /**
   * Effacer l'état d'authentification
   */
  private clearAuthState(): void {
    localStorage.removeItem(this.AUTH_DATA_KEY);
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
      tokenExpiration: null
    });
  }
}