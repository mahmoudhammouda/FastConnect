import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { 
  User, 
  AuthCredentials, 
  AuthResponse, 
  AuthState 
} from '../models/user.model';
import { environment } from '../../environments/environment';

/**
 * Service d'authentification pour gérer la connexion, l'inscription et la déconnexion des utilisateurs
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  
  // Utilisateur et état d'authentification actuels
  private authStateSubject = new BehaviorSubject<AuthState>({
    user: null,
    token: null,
    refreshToken: null,
    expiresAt: null,
    isAuthenticated: false
  });
  
  // Observable public pour l'état d'authentification
  public authState$ = this.authStateSubject.asObservable();
  
  // Pour le développement, utilisation temporaire de données simulées
  private useMockData = true;

  constructor(private http: HttpClient) {
    // Charger l'état d'authentification du localStorage au démarrage
    this.loadAuthState();
  }

  /**
   * Obtenir l'état d'authentification actuel
   */
  public get currentAuthState(): AuthState {
    return this.authStateSubject.value;
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  public get isAuthenticated(): boolean {
    const state = this.currentAuthState;
    
    // Vérifier si l'authentification est valide et non expirée
    if (state.isAuthenticated && state.token) {
      if (state.expiresAt) {
        return new Date() < state.expiresAt;
      }
      return true;
    }
    return false;
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  public get currentUser(): User | null {
    return this.currentAuthState.user;
  }

  /**
   * Obtenir le token JWT actuel
   */
  public get token(): string | null {
    return this.currentAuthState.token;
  }

  /**
   * Authentifier un utilisateur avec ses identifiants
   */
  login(credentials: AuthCredentials): Observable<AuthResponse> {
    if (this.useMockData) {
      // Simuler une réponse de connexion
      return this.mockLogin(credentials);
    }
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => this.handleAuthResponse(response, credentials.rememberMe)),
        catchError(error => {
          console.error('Erreur lors de la connexion:', error);
          return throwError(() => new Error(error.error?.message || 'Erreur de connexion. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Déconnecter l'utilisateur actuel
   */
  logout(): Observable<boolean> {
    // Si nous utilisons une API réelle, il faudrait invalider le token côté serveur
    if (!this.useMockData && this.isAuthenticated) {
      return this.http.post<{success: boolean}>(`${this.apiUrl}/auth/logout`, {})
        .pipe(
          tap(() => this.clearAuthState()),
          map(response => response.success),
          catchError(error => {
            console.error('Erreur lors de la déconnexion:', error);
            // Même en cas d'erreur, nous déconnectons l'utilisateur localement
            this.clearAuthState();
            return of(true);
          })
        );
    }
    
    // Avec les données simulées, effectuer simplement la déconnexion locale
    this.clearAuthState();
    return of(true);
  }

  /**
   * Vérifier si le token est toujours valide
   */
  verifyToken(): Observable<boolean> {
    if (!this.isAuthenticated) {
      return of(false);
    }
    
    if (this.useMockData) {
      // Avec les données simulées, le token est toujours considéré comme valide
      return of(true);
    }
    
    return this.http.get<{valid: boolean}>(`${this.apiUrl}/auth/verify`)
      .pipe(
        map(response => response.valid),
        catchError(() => {
          this.clearAuthState();
          return of(false);
        })
      );
  }

  /**
   * Rafraîchir le token JWT
   */
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.currentAuthState.refreshToken;
    
    if (!refreshToken) {
      return throwError(() => new Error('Aucun token de rafraîchissement disponible.'));
    }
    
    if (this.useMockData) {
      // Simuler un rafraîchissement de token
      const mockResponse: AuthResponse = {
        user: this.currentAuthState.user!,
        token: 'new-mock-jwt-token-' + Date.now(),
        refreshToken: 'new-mock-refresh-token-' + Date.now(),
        expiresIn: 3600 // 1 heure
      };
      
      this.handleAuthResponse(mockResponse, true);
      return of(mockResponse);
    }
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, { refreshToken })
      .pipe(
        tap(response => this.handleAuthResponse(response, true)),
        catchError(error => {
          console.error('Erreur lors du rafraîchissement du token:', error);
          this.clearAuthState();
          return throwError(() => new Error('Session expirée. Veuillez vous reconnecter.'));
        })
      );
  }

  /**
   * Charger l'état d'authentification depuis le localStorage
   */
  private loadAuthState(): void {
    try {
      const savedState = localStorage.getItem('auth_state');
      
      if (savedState) {
        const parsedState = JSON.parse(savedState) as AuthState;
        
        // Convertir la date d'expiration en objet Date
        if (parsedState.expiresAt) {
          parsedState.expiresAt = new Date(parsedState.expiresAt);
          
          // Vérifier si le token n'est pas expiré
          if (parsedState.expiresAt < new Date()) {
            // Token expiré, effacer l'état
            this.clearAuthState();
            return;
          }
        }
        
        // Mettre à jour l'état d'authentification
        this.authStateSubject.next(parsedState);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'état d\'authentification:', error);
      this.clearAuthState();
    }
  }

  /**
   * Traiter la réponse d'authentification et mettre à jour l'état
   */
  private handleAuthResponse(response: AuthResponse, rememberMe: boolean = false): void {
    // Calculer la date d'expiration du token
    let expiresAt: Date | null = null;
    
    if (response.expiresIn) {
      expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + response.expiresIn);
    }
    
    // Créer le nouvel état d'authentification
    const newAuthState: AuthState = {
      user: response.user,
      token: response.token,
      refreshToken: response.refreshToken || null,
      expiresAt: expiresAt,
      isAuthenticated: true
    };
    
    // Mettre à jour l'état
    this.authStateSubject.next(newAuthState);
    
    // Stocker l'état dans le localStorage si rememberMe est activé
    if (rememberMe) {
      localStorage.setItem('auth_state', JSON.stringify(newAuthState));
    }
  }

  /**
   * Effacer l'état d'authentification
   */
  private clearAuthState(): void {
    // Réinitialiser l'état d'authentification
    this.authStateSubject.next({
      user: null,
      token: null,
      refreshToken: null,
      expiresAt: null,
      isAuthenticated: false
    });
    
    // Supprimer les données du localStorage
    localStorage.removeItem('auth_state');
  }

  /**
   * Méthode mock pour simuler une connexion
   * À utiliser uniquement pendant le développement
   */
  private mockLogin(credentials: AuthCredentials): Observable<AuthResponse> {
    // Simuler une vérification des identifiants
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const mockUser: User = {
        id: '1',
        username: 'admin',
        email: 'admin@connect.com',
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        isActive: true
      };
      
      const expiresIn = 3600; // 1 heure
      
      const response: AuthResponse = {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: expiresIn
      };
      
      return of(response).pipe(
        tap(res => this.handleAuthResponse(res, credentials.rememberMe))
      );
    } else if (credentials.username === 'consultant' && credentials.password === 'consultant123') {
      const mockUser: User = {
        id: '2',
        username: 'consultant',
        email: 'consultant@connect.com',
        role: 'consultant',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true
      };
      
      const expiresIn = 3600; // 1 heure
      
      const response: AuthResponse = {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: expiresIn
      };
      
      return of(response).pipe(
        tap(res => this.handleAuthResponse(res, credentials.rememberMe))
      );
    } else if (credentials.username === 'recruiter' && credentials.password === 'recruiter123') {
      const mockUser: User = {
        id: '3',
        username: 'recruiter',
        email: 'recruiter@connect.com',
        role: 'recruiter',
        firstName: 'Jane',
        lastName: 'Smith',
        isActive: true
      };
      
      const expiresIn = 3600; // 1 heure
      
      const response: AuthResponse = {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: expiresIn
      };
      
      return of(response).pipe(
        tap(res => this.handleAuthResponse(res, credentials.rememberMe))
      );
    }
    
    // Simuler une erreur d'authentification
    return throwError(() => new Error('Identifiants incorrects. Veuillez réessayer.'));
  }
}