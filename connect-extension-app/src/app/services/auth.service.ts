import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';
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
   * Traiter le callback de LinkedIn avec le code d'autorisation
   * @param code Code d'autorisation fourni par LinkedIn
   * @param state État pour la vérification de sécurité
   * @returns Observable contenant la réponse d'authentification
   */
  linkedInCallback(code: string, state: string): Observable<AuthResponse> {
    // Ajouter un timestamp pour éviter le cache et avoir une URL unique à chaque tentative
    const timestamp = new Date().getTime();
    
    // Définir un timeout plus long pour cette requête spécifique (10 secondes)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      // Ajouter des params si nécessaire
      params: new HttpParams().set('_', timestamp.toString())
    };
    
    console.log(`Début de l'appel API LinkedIn callback avec le code: ${code.substring(0, 10)}... et state: ${state}`);
    
    return this.apiService.get<AuthResponse>(`auth/linkedin/callback?code=${code}&state=${state}`, httpOptions)
      .pipe(
        timeout(20000), // 20 secondes de timeout pour cette requête
        tap(response => {
          console.log('Réponse reçue du serveur pour LinkedIn callback:', response);
          this.handleAuthResponse(response);
        }),
        catchError(error => {
          console.error('Erreur détaillée lors du callback LinkedIn:', error);
          
          // Améliorer le message d'erreur selon le type d'erreur
          let errorMessage: string;
          
          if (error.name === 'TimeoutError') {
            errorMessage = 'Le serveur a mis trop de temps à répondre. Veuillez réessayer.';
          } else if (error.status === 0) {
            errorMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion internet ou réessayez plus tard.';
          } else if (error.error && error.error.message) {
            errorMessage = error.error.message;
          } else {
            errorMessage = error.message || 'Une erreur inconnue s\'est produite';
          }
          
          // Créer un objet d'erreur personnalisé avec des informations supplémentaires
          const enhancedError = {
            ...error,
            userMessage: errorMessage,
            originalError: error
          };
          
          return throwError(() => enhancedError);
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
   * Gérer la réponse d'authentification
   * @param response Réponse contenant le token JWT et les infos utilisateur
   */
  private handleAuthResponse(response: AuthResponse): void {
    if (response && response.token) {
      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getHours() + 24);

      const authState: AuthState = {
        isAuthenticated: true,
        user: response.user || null,
        token: response.token,
        refreshToken: response.refreshToken || null,
        tokenExpiration: tokenExpiration
      };

      // Stocker dans le stockage local
      this.saveAuthState(authState);

      // Mettre à jour le sujet BehaviorSubject
      this.authStateSubject.next(authState);
      
      console.log('État d\'authentification mis à jour:', authState);
    }
  }
  
  /**
   * Force le rechargement de l'état d'authentification depuis localStorage
   * Utile après une authentification par popup/iframe (LinkedIn)
   */
  refreshAuthState(): void {
    console.log('Rafraîchissement forcé de l\'état d\'authentification');
    
    try {
      // Chargement direct depuis le localStorage sans appel API
      const storedState = localStorage.getItem(this.AUTH_DATA_KEY);
      if (storedState) {
        console.log('[LinkedIn-Auth] Données trouvées dans localStorage, chargement...');
        const parsedState = JSON.parse(storedState);
        const authState: AuthState = {
          isAuthenticated: parsedState.isAuthenticated,
          user: parsedState.user,
          token: parsedState.token,
          refreshToken: parsedState.refreshToken,
          tokenExpiration: parsedState.tokenExpiration ? new Date(parsedState.tokenExpiration) : null
        };
        
        // Mise à jour de l'état sans vérification d'expiration pour éviter l'appel API
        this.authStateSubject.next(authState);
        console.log('État d\'authentification rafraîchi avec succès:', authState);
      } else {
        console.log('Aucun état d\'authentification trouvé dans localStorage');
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement de l\'état d\'authentification:', error);
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
        
        // Vérifier si le token est expiré mais uniquement pour mettre à jour l'interface,
        // sans faire d'appel API pour le rafraîchir (évite l'erreur 404)
        if (authState.isAuthenticated && this.isTokenExpired()) {
          console.log('Token expiré, mise à jour de l\'état sans appel API');
          // On considère l'utilisateur toujours authentifié mais on note que le token est expiré
          // L'UI pourra gérer cette situation si nécessaire
          this.authStateSubject.next(authState);
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