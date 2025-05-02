import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LinkedInCallbackHandlerService } from '../../../services/linkedin-callback-handler.service';
import { ModalService } from '../../../services/modal.service';
import { NotificationService } from '../../../services/notification.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-linkedin-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fc-linkedin-modal-content">
      <!-- État de chargement initial -->
      <div *ngIf="isLoading && !authenticationComplete" class="fc-loading-container">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
        <p>Authentification LinkedIn en cours...</p>
        <p class="fc-linkedin-info">Une fenêtre LinkedIn va s'ouvrir. Veuillez y saisir vos identifiants pour continuer.</p>
        <p class="fc-linkedin-info">Ne fermez pas cette fenêtre pendant l'authentification.</p>
      </div>
      
      <!-- Message de succès - ne s'affiche que lorsque l'authentification est réellement terminée -->
      <div *ngIf="authenticationComplete && !error" class="fc-linkedin-success">
        <div class="fc-linkedin-success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <p>Connexion LinkedIn réussie !</p>
        <p class="fc-linkedin-success-info">Vous allez être redirigé...</p>
      </div>
      
      <!-- Message d'erreur -->
      <div *ngIf="error" class="fc-linkedin-error">
        <div class="fc-linkedin-error-icon">
          <i class="fas fa-exclamation-circle"></i>
        </div>
        <p>{{ error }}</p>
        <button 
          (click)="resetAndRetry()" 
          class="fc-linkedin-retry-button"
        >
          Réessayer
        </button>
        <button 
          (click)="cancel.emit()" 
          class="fc-linkedin-back-button"
        >
          Annuler
        </button>
      </div>
      
      <!-- Bouton d'annulation -->
      <button 
        *ngIf="!error && !authenticationComplete && !isInitialLoading"
        (click)="cancel.emit()" 
        class="fc-linkedin-cancel-button"
      >
        Annuler
      </button>
    </div>
  `,
  styles: [`
    .fc-linkedin-modal-content {
      position: relative;
      height: 300px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .fc-loading-container {
      text-align: center;
      padding: 20px;
    }
    
    .fc-linkedin-info {
      margin-top: 15px;
      font-size: 14px;
      color: #0A66C2;
      font-weight: 500;
      max-width: 300px;
      text-align: center;
    }
    
    .fc-linkedin-error {
      text-align: center;
      padding: 20px;
      color: #e53e3e;
    }
    
    .fc-linkedin-error-icon {
      font-size: 48px;
      margin-bottom: 15px;
    }
    
    .fc-linkedin-success {
      text-align: center;
      padding: 20px;
      color: #38a169;
    }
    
    .fc-linkedin-success-icon {
      font-size: 48px;
      margin-bottom: 15px;
    }
    
    .fc-linkedin-success-info {
      margin-top: 15px;
      font-size: 14px;
      color: #38a169;
      font-weight: 500;
    }
    
    .fc-linkedin-back-button {
      margin-top: 15px;
      margin-left: 10px;
      padding: 8px 16px;
      background-color: #f3f4f6;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 14px;
      cursor: pointer;
    }
    
    .fc-linkedin-retry-button {
      margin-top: 15px;
      padding: 8px 16px;
      background-color: #0A66C2;
      color: white;
      border: none;
      border-radius: 0.375rem;
      font-size: 14px;
      cursor: pointer;
    }
    
    .fc-linkedin-cancel-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: rgba(255, 255, 255, 0.8);
      border: 1px solid #d1d5db;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
    }
  `]
})
export class LinkedInModalComponent implements OnInit, OnDestroy {
  @Input() redirectUrl: string = '/';
  @Output() success = new EventEmitter<{token: string, user: any}>();
  @Output() errorEvent = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();
  
  authenticationComplete = false;
  isInitialLoading = false;
  isLoading = false;
  error: string | null = null;
  linkedInWindow: Window | null = null;
  checkIntervalId: any = null;
  successTimeoutId: any = null;
  
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private linkedInCallbackHandler: LinkedInCallbackHandlerService,
    private router: Router,
    private ngZone: NgZone,
    private modalService: ModalService
  ) {}
  
  ngOnInit(): void {
    console.log('[LinkedIn-Modal] Initialisation du composant LinkedIn Modal');
    console.log('[LinkedIn-Modal] URL de redirection: ' + this.redirectUrl);
    
    this.initializeLinkedInAuth();
    this.setupMessageHandler();
    
    // S'abonner aux événements de callback
    this.linkedInCallbackHandler.getCallbackEvents().subscribe(event => {
      if (event) {
        console.log('[LinkedIn-Modal] Événement de callback reçu:', event);
        if (event.success) {
          this.handleSuccess(event.data);
        } else if (event.error) {
          this.handleError(event.error);
        }
      }
    });
  }
  
  ngOnDestroy(): void {
    console.log('[LinkedIn-Modal] Destruction du composant LinkedIn Modal');
    this.cleanup();
  }
  
  private cleanup(): void {
    // Nettoyer les intervalles et timeouts
    if (this.checkIntervalId) {
      clearInterval(this.checkIntervalId);
      this.checkIntervalId = null;
    }
    
    if (this.successTimeoutId) {
      clearTimeout(this.successTimeoutId);
      this.successTimeoutId = null;
    }
    
    // Supprimer l'écouteur d'événements message
    window.removeEventListener('message', this.handleMessageEvent);
  }
  
  private initializeLinkedInAuth(): void {
    console.log('[LinkedIn-Modal] Initialisation de l\'authentification LinkedIn');
    this.isInitialLoading = true;
    this.isLoading = true;
    this.error = null;
    this.authenticationComplete = false;
    
    // Vérifier si nous sommes dans une extension Chrome
    console.log('[LinkedIn-Modal] Environment:', environment);
    const isExtension = environment.isExtension;
    console.log('[LinkedIn-Modal] Est-ce une extension Chrome?', isExtension);
    
    this.authService.getLinkedInAuthUrl().subscribe({
      next: (response) => {
        console.log('[LinkedIn-Modal] URL d\'authentification LinkedIn reçue:', response);
        
        if (!response || !response.url) {
          this.handleError('URL d\'authentification LinkedIn invalide');
          return;
        }
        
        // Ajouter un paramètre de temps pour éviter la mise en cache
        const authUrl = this.addTimeParam(response.url);
        console.log('[LinkedIn-Modal] URL LinkedIn complète:', authUrl);
        
        if (isExtension && (window as any).chrome && (window as any).chrome.identity) {
          this.authenticateWithChromeIdentity(authUrl);
        } else {
          this.authenticateWithPopup(authUrl);
        }
      },
      error: (error) => {
        console.error('[LinkedIn-Modal] Erreur lors de la récupération de l\'URL LinkedIn:', error);
        this.handleError('Erreur de connexion au service LinkedIn');
      }
    });
  }
  
  private authenticateWithChromeIdentity(authUrl: string): void {
    console.log('[LinkedIn-Modal] Utilisation de chrome.identity');
    const chrome = (window as any).chrome;
    
    try {
      chrome.identity.launchWebAuthFlow({
        url: authUrl,
        interactive: true
      }, (responseUrl: string | undefined) => {
        this.ngZone.run(() => {
          if (chrome.runtime.lastError) {
            console.error('[LinkedIn-Modal] Erreur chrome.identity:', chrome.runtime.lastError);
            this.handleError('Erreur d\'authentification: ' + chrome.runtime.lastError.message);
            return;
          }
          
          if (!responseUrl) {
            console.error('[LinkedIn-Modal] Aucune URL de réponse reçue');
            this.handleError('L\'authentification a été annulée ou a échoué');
            return;
          }
          
          console.log('[LinkedIn-Modal] URL de redirection reçue:', responseUrl);
          this.processAuthCode(responseUrl);
        });
      });
    } catch (error) {
      console.error('[LinkedIn-Modal] Erreur lors de l\'appel à chrome.identity:', error);
      this.handleError('Erreur lors de l\'initialisation de l\'authentification');
    }
  }
  
  private authenticateWithPopup(authUrl: string): void {
    console.log('[LinkedIn-Modal] Ouverture de popup standard');
    
    const width = 600;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    this.linkedInWindow = window.open(
      authUrl,
      'LinkedInLogin',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
    
    if (!this.linkedInWindow) {
      this.handleError('Impossible d\'ouvrir la fenêtre d\'authentification. Veuillez autoriser les popups.');
      return;
    }
    
    this.isInitialLoading = false;
    
    // Vérifier périodiquement l'état de la fenêtre
    this.checkIntervalId = setInterval(() => {
      try {
        if (this.linkedInWindow && this.linkedInWindow.closed) {
          console.log('[LinkedIn-Modal] Détection de fermeture de la popup');
          this.linkedInWindow = null;
          clearInterval(this.checkIntervalId);
          this.checkIntervalId = null;
          
          // Vérifier si le token a été stocké entre-temps
          this.checkAuthenticationStatus();
        }
      } catch (e) {
        console.log('[LinkedIn-Modal] Erreur d\'accès à la popup (cross-origin)');
      }
    }, 500);
  }
  
  private setupMessageHandler(): void {
    // Écouter les messages du popup
    window.addEventListener('message', this.handleMessageEvent);
    
    // Vérifier périodiquement l'authentification
    this.checkIntervalId = setInterval(() => {
      this.checkAuthenticationStatus();
    }, 1000);
  }
  
  private handleMessageEvent = (event: MessageEvent): void => {
    console.log('[LinkedIn-Modal] Message reçu:', event.data);
    
    if (event.data && event.data.type === 'linkedin-auth-complete') {
      this.ngZone.run(() => {
        console.log('[LinkedIn-Modal] Message d\'authentification reçu:', event.data);
        
        if (this.checkIntervalId) {
          clearInterval(this.checkIntervalId);
          this.checkIntervalId = null;
        }
        
        this.isLoading = false;
        
        // Si le message contient un code d'autorisation
        if (event.data.code) {
          console.log('[LinkedIn-Modal] Code reçu du popup, traitement...');
          this.processAuthCode(`http://localhost/auth?code=${event.data.code}&state=${event.data.state || ''}`);
          return;
        }
        
        // Si le message indique un succès
        if (event.data.success === true) {
          console.log('[LinkedIn-Modal] Succès signalé par le popup');
          this.checkAuthenticationStatus();
        } else if (event.data.error) {
          console.log('[LinkedIn-Modal] Erreur signalée par le popup:', event.data.error);
          this.handleError(event.data.error);
        }
      });
    }
  }
  
  private checkAuthenticationStatus(): void {
    if (this.authenticationComplete) {
      return;
    }
    
    try {
      // Vérifier si l'utilisateur est authentifié
      const isAuthenticated = this.authService.isAuthenticated;
      
      // Vérifier aussi le localStorage directement
      const authData = localStorage.getItem('auth_data');
      const hasAuthData = !!authData;
      
      console.log('[LinkedIn-Modal] Vérification auth - isAuthenticated:', isAuthenticated, 'hasAuthData:', hasAuthData);
      
      if (isAuthenticated || hasAuthData) {
        console.log('[LinkedIn-Modal] Utilisateur authentifié!');
        
        this.isLoading = false;
        this.authenticationComplete = true;
        
        // Forcer le rafraîchissement de l'état d'authentification
        this.authService.refreshAuthState();
        
        // Émettre l'événement de succès
        let userData = {};
        let token = '';
        
        if (authData) {
          try {
            const parsedData = JSON.parse(authData);
            token = parsedData.token || '';
            userData = parsedData.user || {};
          } catch (e) {
            console.error('[LinkedIn-Modal] Erreur lors du parsing des données:', e);
          }
        }
        
        this.handleSuccess({ token, user: userData });
      }
    } catch (error) {
      console.error('[LinkedIn-Modal] Erreur lors de la vérification:', error);
    }
  }
  
  private processAuthCode(responseUrl: string): void {
    console.log('[LinkedIn-Modal] Traitement de l\'URL de redirection:', responseUrl);
    
    try {
      const url = new URL(responseUrl);
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      const error = url.searchParams.get('error');
      
      if (error) {
        this.handleError('Erreur LinkedIn: ' + error);
        return;
      }
      
      if (!code) {
        this.handleError('Code d\'autorisation manquant dans la réponse');
        return;
      }
      
      console.log('[LinkedIn-Modal] Envoi du code au serveur:', code.substring(0, 10) + '...');
      this.isLoading = true;
      
      this.authService.linkedInCallback(code, state || '').subscribe({
        next: (response) => {
          console.log('[LinkedIn-Modal] Réponse du serveur reçue:', response);
          
          if (response && response.token) {
            console.log('[LinkedIn-Modal] Token reçu, stockage...');
            
            // Utiliser la méthode standardisée pour stocker les données d'authentification
            this.authService.storeAuthData(response.token, response.user, response.refreshToken);
            
            this.handleSuccess({
              token: response.token,
              user: response.user || {}
            });
          } else {
            this.handleError('Réponse d\'authentification invalide');
          }
        },
        error: (error) => {
          console.error('[LinkedIn-Modal] Erreur du serveur:', error);
          this.handleError('Erreur lors de l\'authentification: ' + 
            (error.error?.message || error.message || 'Erreur inconnue'));
        }
      });
    } catch (error) {
      console.error('[LinkedIn-Modal] Erreur lors du traitement de l\'URL:', error);
      this.handleError('Format d\'URL de redirection invalide');
    }
  }
  
  private handleSuccess(data: {token: string, user: any}): void {
    console.log('[LinkedIn-Modal] Authentification réussie!');
    
    this.authenticationComplete = true;
    this.isLoading = false;
    
    // Émettre l'événement de succès
    this.success.emit(data);
    
    // Fermer la modal
    setTimeout(() => {
      console.log('[LinkedIn-Modal] Fermeture de la modal...');
      this.modalService.closeLoginModal();
    }, 1500);
    
    // Notification pour l'utilisateur
    this.notificationService.loginSuccess('linkedin');
  }
  
  private handleError(message: string): void {
    console.error('[LinkedIn-Modal] Erreur:', message);
    
    this.isLoading = false;
    this.error = message;
    this.errorEvent.emit(message);
    
    // Si le message contient certains patterns, le rendre plus convivial
    if (message.includes('code expired') || message.includes('authorization code')) {
      this.error = 'La session d\'authentification LinkedIn a expiré. Veuillez réessayer.';
    } else if (message.includes('access_denied')) {
      this.error = 'Vous avez refusé l\'accès à LinkedIn. Pour vous connecter, vous devez autoriser l\'application.';
    }
    
    // Notification visible uniquement si on n'est pas dans une iframe
    const isInIframe = window !== window.top;
    if (!isInIframe) {
      this.notificationService.loginError(this.error, 'linkedin');
    }
  }
  
  resetAndRetry(): void {
    console.log('[LinkedIn-Modal] Réinitialisation et nouvelle tentative');
    
    this.error = null;
    this.authenticationComplete = false;
    this.initializeLinkedInAuth();
  }
  
  // Utilitaire pour ajouter un paramètre de temps à l'URL
  private addTimeParam(url: string): string {
    if (!url) return '';
    
    try {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}timestamp=${new Date().getTime()}`;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du timestamp:', error);
      return url;
    }
  }
}
