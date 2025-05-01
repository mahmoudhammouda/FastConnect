import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
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
    // MODIFICATION: Au lieu d'appeler une API qui n'existe pas, on effectue la déconnexion uniquement côté client
    console.log('[Auth] Déconnexion locale sans appel API');
    
    // Nettoyer l'état d'authentification en mémoire et localStorage
    this.clearAuthState();
    
    // Retourner un Observable de succès immédiat
    return of(true).pipe(
      tap(() => {
        console.log('[Auth] Déconnexion effectuée avec succès');
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
   * Méthode publique standardisée pour stocker les données d'authentification
   * Cette méthode doit être utilisée par tous les composants qui ont besoin de stocker des données d'auth
   * @param token Le token JWT
   * @param user Les données utilisateur
   * @param refreshToken Le token de rafraîchissement (optionnel)
   */
  public storeAuthData(token: string, user: any, refreshToken?: string): void {
    console.log('[Auth] Stockage standardisé des données d\'authentification');
    
    if (!token) {
      console.error('[Auth] Tentative de stockage avec un token manquant');
      return;
    }
    
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 24);

    // Créer l'état d'authentification
    const authState: AuthState = {
      isAuthenticated: true,
      user: user || null,
      token: token,
      refreshToken: refreshToken || null,
      tokenExpiration: tokenExpiration
    };

    // IMPORTANT: Ne stocker les données que dans auth_data pour standardisation
    // et éviter les clés multiples dans localStorage
    this.saveAuthState(authState);

    // Mettre à jour le sujet BehaviorSubject
    this.authStateSubject.next(authState);
    
    console.log('[Auth] Données d\'authentification stockées de manière standardisée');
  }

  /**
   * Gérer la réponse d'authentification
   * @param response Données de réponse de l'API
   */
  private handleAuthResponse(response: AuthResponse): void {
    if (response && response.token) {
      // Utiliser la méthode standardisée
      this.storeAuthData(response.token, response.user, response.refreshToken);
    }
  }
  
  /**
   * Force le rechargement de l'état d'authentification depuis localStorage
   * Utile après une authentification par popup/iframe (LinkedIn)
   * @returns true si l'utilisateur est authentifié, false sinon
   */
  refreshAuthState(): boolean {
    console.log('[AuthService] Rafraîchissement forcé de l\'état d\'authentification');
    
    try {
      // Chargement direct depuis le localStorage sans appel API
      const storedState = localStorage.getItem(this.AUTH_DATA_KEY);
      if (storedState) {
        console.log('[AuthService] Données trouvées dans localStorage, chargement...');
        const parsedState = JSON.parse(storedState);
        
        // S'assurer que isAuthenticated est correctement défini si un token est présent
        if (parsedState.token && !parsedState.isAuthenticated) {
          console.log('[AuthService] Token présent mais isAuthenticated faux - correction');
          parsedState.isAuthenticated = true;
        }
        
        const authState: AuthState = {
          isAuthenticated: parsedState.isAuthenticated,
          user: parsedState.user,
          token: parsedState.token,
          refreshToken: parsedState.refreshToken,
          tokenExpiration: parsedState.tokenExpiration ? new Date(parsedState.tokenExpiration) : null
        };
        
        // Mise à jour de l'état sans vérification d'expiration pour éviter l'appel API
        this.authStateSubject.next(authState);
        console.log('[AuthService] État d\'authentification rafraîchi avec succès:', authState.isAuthenticated);
        
        return authState.isAuthenticated;
      } else {
        console.log('[AuthService] Aucun état d\'authentification trouvé dans localStorage');
      }
    } catch (error) {
      console.error('[AuthService] Erreur lors du rafraîchissement de l\'état d\'authentification:', error);
    }
    
    return false;
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
    // Supprimer toutes les clés liées à l'authentification du localStorage
    console.log('[Auth] Nettoyage complet des données d\'authentification du localStorage');
    localStorage.removeItem(this.AUTH_DATA_KEY); // auth_data
    localStorage.removeItem('auth_token');      // token JWT direct
    localStorage.removeItem('user');            // données utilisateur directes
    
    // Optionnel: vous pouvez conserver fc-user-profile car c'est juste une préférence UI
    // localStorage.removeItem('fc-user-profile'); // profil utilisateur (consultant/recruteur)
    
    // Réinitialiser l'état d'authentification dans le service
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
      tokenExpiration: null
    });
    
    console.log('[Auth] Toutes les données d\'authentification ont été nettoyées');
  }
}