import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  AuthState, 
  User, 
  EmailAuthCredentials, 
  LinkedInProfile,
  UserRegistration, 
  UserOnboarding,
  AuthResponse,
  RefreshTokenRequest,
  UserRole
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private authStateSubject: BehaviorSubject<AuthState>;
  private tokenCheckInterval: any;
  private tokenRefreshTimeout: any;

  constructor(private http: HttpClient, private router: Router) {
    // Initialiser l'état d'authentification
    this.authStateSubject = new BehaviorSubject<AuthState>(this.loadAuthState());

    // Configurer la vérification périodique du token si l'utilisateur est authentifié
    if (this.isAuthenticated) {
      this.setupTokenCheck();
      if (this.currentAuthState.tokenExpiration) {
        this.setupTokenRefresh(this.currentAuthState.tokenExpiration);
      }
    }
  }

  /**
   * Charger l'état d'authentification depuis le localStorage
   */
  private loadAuthState(): AuthState {
    try {
      const authData = localStorage.getItem('authState');
      if (authData) {
        const authState: AuthState = JSON.parse(authData);
        // Convertir la date d'expiration en objet Date
        if (authState.tokenExpiration) {
          authState.tokenExpiration = new Date(authState.tokenExpiration);
        }
        return authState;
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'état d\'authentification:', error);
    }
    
    // État par défaut (non authentifié)
    return {
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
      tokenExpiration: null
    };
  }

  /**
   * Sauvegarder l'état d'authentification dans le localStorage
   */
  private saveAuthState(authState: AuthState): void {
    localStorage.setItem('authState', JSON.stringify(authState));
    this.authStateSubject.next(authState);
  }

  /**
   * Vérifier si le token est valide
   */
  private checkTokenValidity(): void {
    const currentState = this.currentAuthState;
    
    if (currentState.isAuthenticated && currentState.tokenExpiration) {
      const now = new Date();
      const expirationDate = new Date(currentState.tokenExpiration);
      
      // Si le token est expiré, essayer de le rafraîchir ou déconnecter l'utilisateur
      if (now >= expirationDate) {
        if (currentState.refreshToken) {
          this.refreshToken(currentState.refreshToken).subscribe({
            error: () => {
              // En cas d'échec du rafraîchissement, déconnecter l'utilisateur
              this.logout().subscribe();
            }
          });
        } else {
          // Pas de token de rafraîchissement, déconnecter l'utilisateur
          this.logout().subscribe();
        }
      }
    }
  }

  /**
   * Configurer une vérification périodique du token
   */
  private setupTokenCheck(): void {
    // Arrêter l'intervalle existant s'il y en a un
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }
    
    // Vérifier le token toutes les 5 minutes
    this.tokenCheckInterval = setInterval(() => this.checkTokenValidity(), 5 * 60 * 1000);
  }

  /**
   * Configurer le rafraîchissement automatique du token
   */
  private setupTokenRefresh(expiration: Date): void {
    // Arrêter le timeout existant s'il y en a un
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
    }
    
    const now = new Date();
    const expirationTime = expiration.getTime();
    const timeUntilExpiry = expirationTime - now.getTime();
    
    // Rafraîchir le token 1 minute avant son expiration
    const refreshTime = Math.max(0, timeUntilExpiry - 60000);
    
    this.tokenRefreshTimeout = setTimeout(() => {
      const currentToken = this.currentAuthState.refreshToken;
      if (currentToken) {
        this.refreshToken(currentToken).subscribe();
      }
    }, refreshTime);
  }

  /**
   * Obtenir l'état d'authentification actuel
   */
  get currentAuthState(): AuthState {
    return this.authStateSubject.value;
  }

  /**
   * Obtenir l'état d'authentification comme Observable
   */
  get authState$(): Observable<AuthState> {
    return this.authStateSubject.asObservable();
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  get currentUser(): User | null {
    return this.currentAuthState.user;
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  get isAuthenticated(): boolean {
    return this.currentAuthState.isAuthenticated;
  }

  /**
   * Obtenir le token JWT
   */
  get token(): string | null {
    return this.currentAuthState.token;
  }

  /**
   * S'authentifier avec email et mot de passe
   */
  loginWithEmail(credentials: EmailAuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap((response: AuthResponse) => this.handleAuthSuccess(response))
    );
  }

  /**
   * S'authentifier avec LinkedIn
   */
  loginWithLinkedIn(profile: LinkedInProfile): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login-linkedin`, profile).pipe(
      tap((response: AuthResponse) => this.handleAuthSuccess(response))
    );
  }

  /**
   * Rafraîchir le token JWT
   */
  refreshToken(refreshToken: string): Observable<AuthResponse> {
    const refreshRequest: RefreshTokenRequest = { refreshToken };
    
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/refresh-token`, refreshRequest).pipe(
      tap((response: AuthResponse) => this.handleAuthSuccess(response))
    );
  }

  /**
   * Traiter la réponse d'authentification réussie
   */
  private handleAuthSuccess(response: AuthResponse): void {
    // Vérifier si la réponse contient les informations nécessaires
    if (!response || !response.token || !response.user) {
      console.error('Réponse d\'authentification invalide');
      return;
    }

    // Calculer la date d'expiration du token
    let expDate: Date;
    if (response.expiration) {
      expDate = new Date(response.expiration);
    } else {
      // Par défaut, le token expire dans 1 heure
      expDate = new Date();
      expDate.setTime(expDate.getTime() + 60 * 60 * 1000);
    }

    // Mettre à jour l'état d'authentification
    const authState: AuthState = {
      isAuthenticated: true,
      user: response.user,
      token: response.token,
      refreshToken: response.refreshToken,
      tokenExpiration: expDate
    };

    // Sauvegarder l'état d'authentification
    this.saveAuthState(authState);

    // Configurer la vérification du token et le rafraîchissement automatique
    this.setupTokenCheck();
    this.setupTokenRefresh(expDate);
  }

  /**
   * Se déconnecter
   */
  logout(): Observable<void> {
    // Nettoyer les intervalles et les timeouts
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
      this.tokenCheckInterval = null;
    }
    
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
      this.tokenRefreshTimeout = null;
    }

    // Appeler l'API de déconnexion si l'utilisateur est authentifié
    if (this.isAuthenticated) {
      return this.http.post<void>(`${this.API_URL}/auth/logout`, {}).pipe(
        tap(() => {
          // Réinitialiser l'état d'authentification
          const authState: AuthState = {
            isAuthenticated: false,
            user: null,
            token: null,
            refreshToken: null,
            tokenExpiration: null
          };
          
          // Sauvegarder l'état d'authentification
          this.saveAuthState(authState);
          
          // Naviguer vers la page de connexion
          this.router.navigate(['/login']);
        }),
        catchError((error) => {
          console.error('Erreur lors de la déconnexion:', error);
          
          // Réinitialiser l'état d'authentification même en cas d'erreur
          const authState: AuthState = {
            isAuthenticated: false,
            user: null,
            token: null,
            refreshToken: null,
            tokenExpiration: null
          };
          
          // Sauvegarder l'état d'authentification
          this.saveAuthState(authState);
          
          // Naviguer vers la page de connexion
          this.router.navigate(['/login']);
          
          return of(undefined);
        })
      );
    } else {
      // Si l'utilisateur n'est pas authentifié, simplement retourner un Observable vide
      return of(undefined);
    }
  }

  /**
   * Enregistrer un nouvel utilisateur
   */
  register(userData: UserRegistration): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/register`, userData).pipe(
      tap((response: AuthResponse) => this.handleAuthSuccess(response))
    );
  }

  /**
   * Terminer l'onboarding de l'utilisateur
   */
  completeOnboarding(onboardingData: UserOnboarding): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/complete-onboarding`, onboardingData).pipe(
      tap((response: AuthResponse) => {
        this.handleAuthSuccess(response);
        // Rediriger vers la page d'accueil après l'onboarding
        this.router.navigate(['/']);
      })
    );
  }

  /**
   * Vérifier si l'utilisateur a besoin de compléter l'onboarding
   */
  needsOnboarding(): boolean {
    const user = this.currentUser;
    return user !== null && !user.onboardingCompleted;
  }

  /**
   * Obtenir le rôle de l'utilisateur actuel
   */
  getUserRole(): UserRole | null {
    const user = this.currentUser;
    return user ? user.role : null;
  }

  /**
   * Vérifier si l'utilisateur a un rôle spécifique
   */
  hasRole(role: UserRole): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  /**
   * Vérifier si l'utilisateur est un consultant
   */
  isConsultant(): boolean {
    return this.hasRole(UserRole.Consultant);
  }

  /**
   * Vérifier si l'utilisateur est un recruteur
   */
  isRecruiter(): boolean {
    return this.hasRole(UserRole.Recruiter);
  }

  /**
   * Vérifier si l'utilisateur est un administrateur
   */
  isAdmin(): boolean {
    return this.hasRole(UserRole.Admin);
  }

  /**
   * Vérifier si l'utilisateur est authentifié avec LinkedIn
   */
  isLinkedInAuthenticated(): boolean {
    const user = this.currentUser;
    return user !== null && user.isLinkedInAuthenticated;
  }

  /**
   * Mise à jour du profil utilisateur
   */
  updateUserProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/auth/update-profile`, userData).pipe(
      tap((updatedUser: User) => {
        if (updatedUser && this.currentUser) {
          // Mettre à jour l'utilisateur dans l'état d'authentification
          const updatedState: AuthState = {
            ...this.currentAuthState,
            user: {
              ...this.currentUser,
              ...updatedUser
            }
          };
          
          // Sauvegarder l'état d'authentification mis à jour
          this.saveAuthState(updatedState);
        }
      })
    );
  }
}