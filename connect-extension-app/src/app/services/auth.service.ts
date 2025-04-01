import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { 
  User, 
  AuthCredentials,
  EmailAuthCredentials,
  LinkedInAuthCredentials,
  LinkedInProfile,
  UserRegistration,
  AuthResponse, 
  AuthState,
  AuthMethod 
} from '../models/user.model';
import { environment } from '../../environments/environment';

/**
 * Service d'authentification pour gérer la connexion, l'inscription et la déconnexion des utilisateurs
 * dans l'application FastConnect
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

  constructor(
    private http: HttpClient,
    private socialAuthService: SocialAuthService
  ) {
    // Charger l'état d'authentification du localStorage au démarrage
    this.loadAuthState();
    
    // S'abonner aux événements d'authentification sociale
    this.socialAuthService.authState.subscribe(user => {
      if (user && user.provider === 'LINKEDIN') {
        // Conversion du profil social en profil LinkedIn
        const linkedInProfile: LinkedInProfile = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.photoUrl,
          headline: user.response?.headline || ''
        };
        
        // Authentifier avec le profil LinkedIn
        this.loginWithLinkedIn(linkedInProfile).subscribe();
      }
    });
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
   * Démarrer le processus d'authentification LinkedIn
   */
  initiateLinkedInLogin(): void {
    this.socialAuthService.signIn('LINKEDIN');
  }

  /**
   * Authentifier avec LinkedIn
   */
  loginWithLinkedIn(profile: LinkedInProfile, rememberMe: boolean = false): Observable<AuthResponse> {
    if (this.useMockData) {
      return this.mockLinkedInLogin(profile, rememberMe);
    }
    
    // Dans une implémentation réelle, envoyer ces données au backend
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/linkedin`, { profile })
      .pipe(
        tap(response => this.handleAuthResponse(response, rememberMe)),
        catchError(error => {
          console.error('Erreur lors de la connexion LinkedIn:', error);
          return throwError(() => new Error(error.error?.message || 'Erreur de connexion LinkedIn. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Authentifier un utilisateur avec email/mot de passe
   */
  loginWithEmail(credentials: EmailAuthCredentials): Observable<AuthResponse> {
    if (this.useMockData) {
      return this.mockEmailLogin(credentials);
    }
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => this.handleAuthResponse(response, credentials.rememberMe)),
        catchError(error => {
          console.error('Erreur lors de la connexion email:', error);
          return throwError(() => new Error(error.error?.message || 'Identifiants incorrects. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Inscrire un nouvel utilisateur
   */
  register(userData: UserRegistration): Observable<AuthResponse> {
    if (this.useMockData) {
      return this.mockRegister(userData);
    }
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => this.handleAuthResponse(response, true)),
        catchError(error => {
          console.error('Erreur lors de l\'inscription:', error);
          return throwError(() => new Error(error.error?.message || 'Erreur lors de l\'inscription. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Mettre à jour le profil utilisateur
   */
  updateUserProfile(userId: string, profileData: Partial<User>): Observable<User> {
    if (this.useMockData) {
      return this.mockUpdateProfile(userId, profileData);
    }
    
    return this.http.put<User>(`${this.apiUrl}/users/${userId}`, profileData)
      .pipe(
        tap(updatedUser => {
          // Mettre à jour l'état d'authentification avec le nouvel utilisateur
          const currentState = this.currentAuthState;
          if (currentState.user) {
            const newState = {
              ...currentState,
              user: { ...updatedUser }
            };
            this.authStateSubject.next(newState);
            
            // Mettre à jour le localStorage si l'utilisateur est "remember me"
            if (localStorage.getItem('auth_state')) {
              localStorage.setItem('auth_state', JSON.stringify(newState));
            }
          }
        }),
        catchError(error => {
          console.error('Erreur lors de la mise à jour du profil:', error);
          return throwError(() => new Error(error.error?.message || 'Erreur lors de la mise à jour du profil. Veuillez réessayer.'));
        })
      );
  }

  /**
   * Déconnecter l'utilisateur actuel
   */
  logout(): Observable<boolean> {
    // Déconnexion du fournisseur social si nécessaire
    this.socialAuthService.signOut();
    
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
   * Vérifier si c'est la première connexion de l'utilisateur
   */
  isFirstLogin(user: User): boolean {
    return !user.hasCompletedOnboarding;
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
   * Méthode mock pour simuler une connexion avec LinkedIn
   * À utiliser uniquement pendant le développement
   */
  private mockLinkedInLogin(profile: LinkedInProfile, rememberMe: boolean): Observable<AuthResponse> {
    // Vérifier si l'utilisateur existe déjà dans notre "base de données"
    const isNewUser = !localStorage.getItem(`linkedin_user_${profile.id}`);
    
    // Simuler un délai réseau
    return of(null).pipe(
      delay(800),
      switchMap(() => {
        // Créer un utilisateur basé sur le profil LinkedIn
        const mockUser: User = {
          id: `li_${profile.id}`,
          username: `${profile.firstName.toLowerCase()}.${profile.lastName.toLowerCase()}`,
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          profilePicture: profile.profilePicture,
          profession: profile.headline || 'Professionnel LinkedIn',
          role: 'consultant', // Rôle par défaut
          isActive: true,
          linkedinId: profile.id,
          authMethod: 'linkedin',
          hasCompletedOnboarding: !isNewUser
        };
        
        // Simuler un enregistrement en "base de données"
        if (isNewUser) {
          localStorage.setItem(`linkedin_user_${profile.id}`, JSON.stringify(mockUser));
        }
        
        const response: AuthResponse = {
          user: mockUser,
          token: `mock-linkedin-jwt-token-${Date.now()}`,
          refreshToken: `mock-linkedin-refresh-token-${Date.now()}`,
          expiresIn: 3600, // 1 heure
          isNewUser: isNewUser
        };
        
        return of(response).pipe(
          tap(res => this.handleAuthResponse(res, rememberMe))
        );
      })
    );
  }

  /**
   * Méthode mock pour simuler une connexion avec email/mot de passe
   * À utiliser uniquement pendant le développement
   */
  private mockEmailLogin(credentials: EmailAuthCredentials): Observable<AuthResponse> {
    // Simuler une vérification des identifiants
    if (credentials.email === 'admin@fastconnect.com' && credentials.password === 'admin123') {
      const mockUser: User = {
        id: '1',
        username: 'admin',
        email: 'admin@fastconnect.com',
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        isActive: true,
        authMethod: 'email',
        hasCompletedOnboarding: true
      };
      
      const expiresIn = 3600; // 1 heure
      
      const response: AuthResponse = {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: expiresIn
      };
      
      return of(response).pipe(
        delay(800),
        tap(res => this.handleAuthResponse(res, credentials.rememberMe))
      );
    } else if (credentials.email === 'consultant@fastconnect.com' && credentials.password === 'consultant123') {
      const mockUser: User = {
        id: '2',
        username: 'consultant',
        email: 'consultant@fastconnect.com',
        role: 'consultant',
        firstName: 'John',
        lastName: 'Doe',
        profession: 'Développeur Full Stack',
        isActive: true,
        authMethod: 'email',
        hasCompletedOnboarding: true
      };
      
      const expiresIn = 3600; // 1 heure
      
      const response: AuthResponse = {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: expiresIn
      };
      
      return of(response).pipe(
        delay(800),
        tap(res => this.handleAuthResponse(res, credentials.rememberMe))
      );
    } else if (credentials.email === 'recruiter@fastconnect.com' && credentials.password === 'recruiter123') {
      const mockUser: User = {
        id: '3',
        username: 'recruiter',
        email: 'recruiter@fastconnect.com',
        role: 'recruiter',
        firstName: 'Jane',
        lastName: 'Smith',
        profession: 'Talent Acquisition Manager',
        isActive: true,
        authMethod: 'email',
        hasCompletedOnboarding: true
      };
      
      const expiresIn = 3600; // 1 heure
      
      const response: AuthResponse = {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        expiresIn: expiresIn
      };
      
      return of(response).pipe(
        delay(800),
        tap(res => this.handleAuthResponse(res, credentials.rememberMe))
      );
    }
    
    // Simuler une erreur d'authentification
    return of(null).pipe(
      delay(800),
      switchMap(() => throwError(() => new Error('Identifiants incorrects. Veuillez réessayer.')))
    );
  }

  /**
   * Méthode mock pour simuler une inscription
   * À utiliser uniquement pendant le développement
   */
  private mockRegister(userData: UserRegistration): Observable<AuthResponse> {
    // Vérifier si l'email est déjà utilisé
    const userExists = ['admin@fastconnect.com', 'consultant@fastconnect.com', 'recruiter@fastconnect.com']
      .includes(userData.email);
    
    if (userExists) {
      return of(null).pipe(
        delay(800),
        switchMap(() => throwError(() => new Error('Cet email est déjà utilisé. Veuillez en choisir un autre.')))
      );
    }
    
    // Créer un nouvel utilisateur
    const newUser: User = {
      id: `user_${Date.now()}`,
      username: userData.email.split('@')[0],
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      profession: userData.profession,
      role: userData.role,
      isActive: true,
      authMethod: 'email',
      linkedinId: userData.linkedinId,
      profilePicture: userData.profilePicture,
      hasCompletedOnboarding: true
    };
    
    const response: AuthResponse = {
      user: newUser,
      token: `mock-register-jwt-token-${Date.now()}`,
      refreshToken: `mock-register-refresh-token-${Date.now()}`,
      expiresIn: 3600 // 1 heure
    };
    
    return of(response).pipe(
      delay(1000),
      tap(res => this.handleAuthResponse(res, true))
    );
  }

  /**
   * Méthode mock pour simuler une mise à jour de profil
   * À utiliser uniquement pendant le développement
   */
  private mockUpdateProfile(userId: string, profileData: Partial<User>): Observable<User> {
    const currentUser = this.currentUser;
    
    if (!currentUser || currentUser.id !== userId) {
      return throwError(() => new Error('Utilisateur non autorisé.'));
    }
    
    // Mettre à jour l'utilisateur
    const updatedUser: User = {
      ...currentUser,
      ...profileData,
      // S'assurer que ces champs ne sont pas écrasés
      id: currentUser.id,
      email: profileData.email || currentUser.email,
      authMethod: currentUser.authMethod
    };
    
    return of(updatedUser).pipe(delay(800));
  }
}

// N'oubliez pas d'ajouter ces imports en haut du fichier
import { delay, switchMap } from 'rxjs/operators';