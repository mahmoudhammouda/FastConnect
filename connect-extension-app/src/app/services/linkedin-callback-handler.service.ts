import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LinkedInCallbackEvent {
  success: boolean;
  data?: any;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LinkedInCallbackHandlerService {
  // Observable pour communiquer le résultat du callback entre composants
  private callbackSubject = new BehaviorSubject<LinkedInCallbackEvent | null>(null);
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}
  
  /**
   * Surveiller les événements de callback LinkedIn
   */
  getCallbackEvents(): Observable<LinkedInCallbackEvent | null> {
    return this.callbackSubject.asObservable();
  }
  
  /**
   * Traiter un callback LinkedIn à partir de l'URL
   */
  processCallbackFromUrl(url: string): void {
    // Extraire les paramètres de l'URL
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    // Gérer les erreurs
    if (error) {
      this.handleError(error, errorDescription || 'Erreur inconnue');
      return;
    }
    
    // Vérifier la présence du code
    if (!code || !state) {
      this.handleError('missing_params', 'Paramètres manquants dans la réponse LinkedIn');
      return;
    }
    
    // Traiter le code d'autorisation
    this.processAuthCode(code, state);
  }
  
  /**
   * Appel au backend pour échanger le code contre un token
   */
  private processAuthCode(code: string, state: string): void {
    this.authService.linkedInCallback(code, state).subscribe({
      next: (response) => {
        if (response && response.token) {
          // Stockage du token JWT
          localStorage.setItem('auth_token', response.token);
          
          // Stockage des informations utilisateur
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          
          this.notificationService.loginSuccess('linkedin');
          
          // Émettre l'événement de succès
          this.callbackSubject.next({
            success: true,
            data: response
          });
          
          // Rediriger vers la page principale si nécessaire
          // Commenté car nous voulons garder l'utilisateur dans la modal
          // this.router.navigate(['/']);
        } else {
          this.handleError('invalid_response', 'Réponse d\'authentification invalide');
        }
      },
      error: (error) => {
        const errorMessage = error.error?.message || error.message || 'Erreur inconnue';
        this.handleError('auth_error', errorMessage);
      }
    });
  }
  
  /**
   * Gestion des erreurs LinkedIn
   */
  private handleError(errorCode: string, errorMessage: string): void {
    this.notificationService.loginError(errorMessage, 'linkedin');
    
    // Émettre l'événement d'erreur
    this.callbackSubject.next({
      success: false,
      error: errorMessage
    });
    
    console.error(`Erreur LinkedIn (${errorCode}):`, errorMessage);
  }
  
  /**
   * Réinitialiser l'état
   */
  reset(): void {
    this.callbackSubject.next(null);
  }
}
