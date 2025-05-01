import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LinkedInCallbackHandlerService } from '../../../services/linkedin-callback-handler.service';
import { ModalService } from '../../../services/modal.service';
import { NotificationService } from '../../../services/notification.service';

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
  checkIntervalId: any = null; // Pour vérifier l'état de la fenêtre popup
  successTimeoutId: any = null; // Pour nettoyer le setTimeout de succès
  
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
    this.setupCallbackListener();
    
    // S'abonner aux événements de callback
    console.log('[LinkedIn-Modal] Mise en place de l\'abonnement aux événements de callback');
    this.linkedInCallbackHandler.getCallbackEvents().subscribe(event => {
      if (event) {
        console.log('[LinkedIn-Modal] Événement de callback reçu:', event);
        if (event.success) {
          console.log('[LinkedIn-Modal] Événement de succès émis avec les données:', event.data);
          this.success.emit(event.data);
        } else if (event.error) {
          console.log('[LinkedIn-Modal] Événement d\'erreur reçu:', event.error);
          this.error = event.error;
          this.errorEvent.emit(event.error);
          this.isLoading = false;
        }
      } else {
        console.log('[LinkedIn-Modal] Événement de callback vide reçu');
      }
    });
  }
  
  ngOnDestroy(): void {
    console.log('[LinkedIn-Modal] Destruction du composant LinkedIn Modal');
    // Nettoyer les intervalles et timeouts
    if (this.checkIntervalId) {
      console.log('[LinkedIn-Modal] Arrêt de l\'intervalle de vérification');
      clearInterval(this.checkIntervalId);
      this.checkIntervalId = null;
    }
    
    // Nettoyer également le timeout de succès
    if (this.successTimeoutId) {
      console.log('[LinkedIn-Modal] Arrêt du timeout de notification de succès');
      clearTimeout(this.successTimeoutId);
      this.successTimeoutId = null;
    }
    
    console.log('[LinkedIn-Modal] Suppression de l\'écouteur d\'événements message');
    window.removeEventListener('message', this.handleCallback);
  }
  
  private initializeLinkedInAuth(): void {
    console.log('[LinkedIn-Modal] Initialisation de l\'authentification LinkedIn');
    this.isInitialLoading = true;
    this.isLoading = true;
    this.error = null;
    this.authenticationComplete = false;
    
    // Désactiver l'écouteur précédent s'il existe
    console.log('[LinkedIn-Modal] Suppression de l\'ancien écouteur d\'événements message');
    window.removeEventListener('message', this.handleCallback);
    // Ajouter le nouvel écouteur
    console.log('[LinkedIn-Modal] Ajout du nouvel écouteur d\'événements message');
    window.addEventListener('message', this.handleCallback);
    
    // Arrêter tout intervalle précédent
    if (this.checkIntervalId) {
      console.log('[LinkedIn-Modal] Nettoiement de l\'intervalle précédent');
      clearInterval(this.checkIntervalId);
      this.checkIntervalId = null;
    }
    console.log('[LinkedIn-Modal] État initial configuré, prêt à demander l\'URL d\'authentification');
    
    
    console.log('[LinkedIn-Modal] Demande de l\'URL d\'authentification LinkedIn');
    this.authService.getLinkedInAuthUrl().subscribe({
      next: (response) => {
        console.log('[LinkedIn-Modal] URL d\'authentification LinkedIn reçue:', response);
        console.log('[LinkedIn-Modal] Préparation de l\'ouverture de la fenêtre LinkedIn');
        
        // Créer une nouvelle popup avec une taille appropriée et position centrée
        const width = 600;
        const height = 700;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        
        // S'assurer que l'URL contient bien un paramètre unique pour éviter la mise en cache
        // Vérifier que l'URL existe bien
        if (!response || !response.url) {
          console.error('[LinkedIn-Modal] URL d\'authentification LinkedIn manquante ou invalide:', response);
          this.error = "URL d'authentification LinkedIn manquante ou invalide";
          this.isLoading = false;
          this.notificationService.error(this.error, 'Erreur LinkedIn');
          return;
        }
        
        const uniqueUrl = this.addTimeParam(response.url);
        console.log('[LinkedIn-Modal] URL d\'authentification LinkedIn avec timestamp:', uniqueUrl);
        
        // Ouvrir la fenêtre popup avec une taille et position optimales
        console.log('[LinkedIn-Modal] Tentative d\'ouverture de la popup LinkedIn');
        const popup = window.open(
          uniqueUrl, 
          'linkedInAuthPopup',
          `width=${width},height=${height},left=${left},top=${top},toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0`
        );
        
        console.log('[LinkedIn-Modal] État de la popup:', popup ? 'Ouverte avec succès' : 'Impossible d\'ouvrir la popup');
        this.isInitialLoading = false;
        
        // Vérifier si la popup a été bloquée
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          console.error('[LinkedIn-Modal] La popup a été bloquée par le navigateur');
          this.error = "La fenêtre d'authentification LinkedIn a été bloquée par votre navigateur. Veuillez autoriser les popups pour ce site.";
          this.isLoading = false;
          this.notificationService.error(this.error, 'Erreur LinkedIn');
          return;
        }
        
        // Mettre le focus sur la popup
        console.log('[LinkedIn-Modal] Mise du focus sur la popup LinkedIn');
        popup.focus();
        
        // Vérifier périodiquement si l'authentification a réussi ou si la popup a été fermée
        console.log('[LinkedIn-Modal] Démarrage de l\'intervalle de vérification de la popup');
        this.checkIntervalId = setInterval(() => {
          try {
            if (popup.closed) {
              console.log('[LinkedIn-Modal] La fenêtre popup LinkedIn a été fermée');
              clearInterval(this.checkIntervalId);
              this.checkIntervalId = null;
              
              // Vérifier si une authentification a été effectuée entre-temps
              console.log('[LinkedIn-Modal] Vérification de l\'authentification après fermeture de la popup');
              this.checkForAuthCode();
            } else {
              // Log périodique pour voir l'état de la popup
              console.log('[LinkedIn-Modal] La popup LinkedIn est toujours ouverte, URL actuelle:', 
                  (popup.location && popup.location.href) ? popup.location.href.substring(0, 100) + '...' : 'non accessible');
            }
          } catch (e) {
            // Gestion des erreurs d'accès à la popup (cross-origin)
            console.log('[LinkedIn-Modal] Impossible d\'accéder aux propriétés de la popup (erreur cross-origin)');
          }
        }, 500);
      },
      error: (error) => {
        console.error('[LinkedIn-Modal] Erreur lors de la récupération de l\'URL LinkedIn:', error);
        this.isLoading = false;
        this.isInitialLoading = false;
        this.error = "Impossible de se connecter à LinkedIn. Veuillez réessayer plus tard.";
        console.error('[LinkedIn-Modal] Erreur LinkedIn redirect:', error);
        this.notificationService.error(this.error, 'Erreur LinkedIn');
      }
    });
    console.log('[LinkedIn-Modal] Requête d\'URL LinkedIn envoyée, en attente de réponse');
  }
  
  // Aucune iframe n'est utilisée maintenant, fonction non utilisée  
  onFrameLoad(): void {
    console.log('LinkedIn auth popup ouverte');
  }
  
  private setupCallbackListener(): void {
    // Écouter les messages du popup
    window.addEventListener('message', this.handleCallback);
    
    // Vérifier périodiquement si l'utilisateur a été authentifié
    this.checkIntervalId = setInterval(() => {
      this.checkForAuthCode();
    }, 1000);
  }
  
  private handleCallback = (event: MessageEvent) => {
    console.log('Message reçu dans le modal principal:', event.data);
    
    // Vérifier si le message est de notre popup d'authentification LinkedIn
    if (event.data && event.data.type === 'linkedin-auth-complete') {
      // S'assurer que nous sommes dans la zone Angular pour les mises à jour d'UI
      this.ngZone.run(() => {
        console.log('[LinkedIn-Modal] Auth LinkedIn terminée dans le popup:', event.data);
        
        // Arrêter l'intervalle de vérification
        if (this.checkIntervalId) {
          clearInterval(this.checkIntervalId);
          this.checkIntervalId = null;
        }
        
        // Marquer que nous avons reçu une réponse du popup
        this.isLoading = false;
        
        if (event.data.success === true) {
          // Authentification réussie
          this.authenticationComplete = true;
          // Afficher une notification de succès dans l'application principale seulement si demandé
          if (event.data.shouldNotify) {
            this.notificationService.loginSuccess('linkedin');
          }
          // Vérifier le localStorage au cas où le token a déjà été enregistré
          this.checkForAuthCode();
        } else if (event.data.error) {
          // La popup indique une erreur
          this.error = event.data.error || "Erreur pendant l'authentification LinkedIn";
          // S'assurer que l'erreur n'est pas null avant de l'envoyer à la notification
          const errorMessage = this.error || "Erreur pendant l'authentification LinkedIn";
          // Émettre l'événement d'erreur
          this.errorEvent.emit(errorMessage);
          // Afficher une notification d'erreur dans l'application principale seulement si demandé
          if (event.data.shouldNotify) {
            this.notificationService.loginError(errorMessage, 'linkedin');
          }
        } else {
          // Si la popup est fermée sans message clair (succès ou erreur)
          this.checkForAuthCode();
        }
      });
    }
  }
  
  /**
   * Vérifie périodiquement si l'authentification a réussi
   * Note: Cette méthode est un mécanisme de secours et n'est plus la méthode principale
   * d'authentification depuis la standardisation du processus
   */
  private checkForAuthCode(): void {
    // Si l'authentification est déjà complétée, ne pas exécuter cette fonction
    if (this.authenticationComplete) {
      // S'assurer que l'intervalle est bien arrêté
      if (this.checkIntervalId) {
        console.log('[LinkedIn-Modal] Arrêt des vérifications périodiques (auth déjà complétée)');
        clearInterval(this.checkIntervalId);
        this.checkIntervalId = null;
      }
      return;
    }
    
    try {
      // Vérifier uniquement si l'utilisateur est bien authentifié
      // sans log pour éviter de polluer la console avec des vérifications négatives
      const isAuthenticated = this.authService.isAuthenticated;
      const hasToken = this.authService.token !== null;
      
      if (isAuthenticated && hasToken) {
        // IMPORTANT: Arrêter d'abord l'intervalle avant tout traitement
        if (this.checkIntervalId) {
          console.log('[LinkedIn-Modal] Arrêt de l\'intervalle de vérification');
          clearInterval(this.checkIntervalId);
          this.checkIntervalId = null;
        }
        
        console.log('[LinkedIn-Modal] Token et données utilisateur trouvés, authentification réussie!');
        
        // Marquer l'authentification comme terminée avant tout autre traitement
        this.isLoading = false;
        this.authenticationComplete = true;
        
        // Forcer le rafraîchissement de l'état d'authentification pour mettre à jour l'UI
        console.log('[LinkedIn-Modal] Rafraichissement de l\'etat d\'authentification via authService');
        this.authService.refreshAuthState();
        
        // Gérer le succès une seule fois
        if (!this.successTimeoutId) {
          // Afficher une notification de succès
          this.notificationService.loginSuccess('linkedin');
          
          console.log('[LinkedIn-Modal] Envoi unique de la notification de succès');

          // Notifier le composant parent après un court délai très court
          this.successTimeoutId = setTimeout(() => {
            // Vérifier si on est dans une iframe
            const isInIframe = window.self !== window.top;
            console.log('[LinkedIn-Modal] En iframe ?: ' + isInIframe);
            
            // Émettre l'événement de succès une seule fois en utilisant les valeurs du service d'authentification
            console.log('[LinkedIn-Modal] Emission unique de l\'evenement de succes');
            this.success.emit({
              token: this.authService.token || '',
              user: this.authService.currentUser || {}
            });
            
            // Gérer la fermeture des modales de façon séquentielle et avec des délais appropriés
            console.log('[LinkedIn-Modal] Fermeture automatique des modales - séquence démarrée');
            
            // 1. D'abord fermer la modal LinkedIn si elle est dans une fenêtre popup
            if (window.opener) {
              console.log('[LinkedIn-Modal] Envoi du message à la fenêtre parente pour fermer la modal LinkedIn');
              window.opener.postMessage({ type: 'close-linkedin-modal' }, '*');
            }
            
            // 2. Attendre un peu pour s'assurer que la première modale est fermée
            this.ngZone.run(() => {
              console.log('[LinkedIn-Modal] Préparation de la fermeture de la modal de login dans NgZone');
              
              // Avec un délai suffisant pour permettre aux actions précédentes de se terminer
              setTimeout(() => {
                console.log('[LinkedIn-Modal] Tentative de fermeture de la modal de login principale');
                this.modalService.closeLoginModal();
                console.log('[LinkedIn-Modal] État de la modal après tentative de fermeture:', 
                  this.modalService.isLoginModalVisible ? 'toujours visible' : 'fermée');
                
                // Une seconde tentative pour plus de robustesse
                setTimeout(() => {
                  if (this.modalService.isLoginModalVisible) {
                    console.log('[LinkedIn-Modal] Seconde tentative de fermeture de la modal');
                    this.modalService.closeLoginModal();
                  }
                }, 500);
              }, 300);
            });
            
            console.log('[LinkedIn-Modal] Processus d\'authentification terminé avec succès');
            
            // Annuler la référence du timeout après exécution
            this.successTimeoutId = null;
          }, 500);
        }
        
        // Arrêter la vérification
        if (this.checkIntervalId) {
          console.log('[LinkedIn-Modal] Arrêt de l\'intervalle de vérification');
          clearInterval(this.checkIntervalId);
          this.checkIntervalId = null;
        }
      } else {
        // Ne rien afficher ici pour éviter de polluer la console avec des vérifications négatives régulières
        // L'utilisateur n'est pas encore authentifié, mais le processus est toujours en cours
        this.isLoading = false;
      }
    } catch (error) {
      console.error('[LinkedIn-Modal] Erreur lors de la vérification de l\'authentification:', error);
      this.isLoading = false;
    }
  }
  
  // Fonction utilitaire pour ajouter un paramètre de temps à l'URL
  private addTimeParam(url: string): string {
    // S'assurer que l'URL est bien une chaîne de caractères non vide
    if (!url || typeof url !== 'string') {
      console.error('URL invalide passée à addTimeParam:', url);
      return '';
    }
    
    try {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}_=${new Date().getTime()}`;
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'un paramètre de temps à l\'URL:', error);
      return url; // Retourner l'URL d'origine en cas d'erreur
    }
  }
  
  private processAuthCode(code: string, state: string): void {
    // Ajout d'un timestamp pour s'assurer que nous traitons un code frais
    const timestamp = new Date().getTime();
    
    this.isLoading = true;
    console.log('[LinkedIn-Modal] Traitement du code d\'autorisation LinkedIn:', code.substring(0, 10) + '...');
    console.log('[LinkedIn-Modal] State:', state);
    console.log('[LinkedIn-Modal] Timestamp:', timestamp);
    
    // Utiliser le service pour traiter le code d'autorisation directement
    console.log('[LinkedIn-Modal] Appel à authService.linkedInCallback avec code et state');
    this.authService.linkedInCallback(code, state).subscribe({
      next: (response) => {
        console.log('[LinkedIn-Modal] Réponse reçue du service d\'authentification LinkedIn:', response);
        if (response && response.token) {
          console.log('[LinkedIn-Modal] Token présent dans la réponse, traitement...');
          // Utiliser la méthode standardisée du service d'authentification
          console.log('[LinkedIn-Modal] Stockage des données via le service standardisé');
          this.authService.storeAuthData(response.token, response.user, response.refreshToken);
          console.log('[LinkedIn-Modal] Données d\'authentification stockées de manière standardisée');
          
          // Logs pour le débogage
          if (response.user) {
            console.log('[LinkedIn-Modal] Informations utilisateur présentes dans la réponse');
          } else {
            console.log('[LinkedIn-Modal] Aucune information utilisateur dans la réponse');
          }
          
          this.authenticationComplete = true;
          this.isLoading = false;
          console.log('[LinkedIn-Modal] État mis à jour: authenticationComplete=true, isLoading=false');
          
          // IMPORTANT: Forcer le rafraîchissement de l'état d'authentification pour mettre à jour l'UI
          console.log('[LinkedIn-Modal] Rafraichissement de l\'etat d\'authentification');
          this.authService.refreshAuthState();
          
          // NE PAS envoyer la notification depuis ce composant pour éviter les doublons
          // La notification sera envoyée par le composant Login principal qui est plus adapté
          console.log('[LinkedIn-Modal] Authentification LinkedIn réussie, déclenchement de la fermeture');
          
          // IMPORTANT: Déclencher immédiatement l'événement success pour que le parent ferme les modals
          console.log('[LinkedIn-Modal] Émission immédiate de l\'evento success');
          this.success.emit({
            token: this.authService.token || '',
            user: this.authService.currentUser || {}
          });
          
          // Vérifier si on est dans une iframe (pour la logique de communication)
          const isInIframe = window.self !== window.top;
          console.log('[LinkedIn-Modal] En iframe ?: ' + isInIframe);
          
          // Émettre l'événement de succès
          console.log('[LinkedIn-Modal] Preparation emission evenement succes avec delai de 1.5s');
          setTimeout(() => {
            console.log('[LinkedIn-Modal] Emission evenement success');
            this.success.emit({
              token: response.token,
              user: response.user || {}
            });
            
            // Fermer la modal de login principale
            console.log('[LinkedIn-Modal] Fermeture de la modal de login principale');
            this.modalService.closeLoginModal();
            
            console.log('[LinkedIn-Modal] Evenement success emis avec succes');
          }, 1500);
        } else {
          console.error('[LinkedIn-Modal] Réponse d\'authentification invalide:', response);
          this.handleError('Réponse d\'authentification invalide');
        }
      },
      error: (error) => {
        console.error('[LinkedIn-Modal] Erreur lors de l\'appel API LinkedIn callback:', error);
        // Utiliser le message d'erreur personnalisé s'il existe
        const errorMessage = error.userMessage || error.error?.message || error.message || 'Erreur inconnue';
        console.error('[LinkedIn-Modal] Détails de l\'erreur dans LinkedIn Modal:', error);
        console.error('[LinkedIn-Modal] Message d\'erreur formatté:', errorMessage);
        this.handleError(errorMessage);
      }
    });
  }
  
  resetAndRetry(): void {
    console.log('[LinkedIn-Modal] Réinitialisation et nouvelle tentative d\'authentification');
    // Réinitialiser l'état et réessayer l'authentification
    this.error = null;
    this.authenticationComplete = false;
    console.log('[LinkedIn-Modal] État réinitialisé, redémarrage du processus d\'authentification');
    this.initializeLinkedInAuth();
  }
  
  private handleError(message: string): void {
    console.log('[LinkedIn-Modal] Traitement de l\'erreur:', message);
    this.isLoading = false;
    this.authenticationComplete = false;
    this.error = message;
    
    // Affiner le message d'erreur pour l'expiration du code
    if (message.includes('code expired') || message.includes('does not match authorization code')) {
      console.log('[LinkedIn-Modal] Détection d\'une erreur d\'expiration de code');
      this.error = 'La session d\'authentification LinkedIn a expiré. Veuillez réessayer.';
    } else if (message.includes('access_denied')) {
      console.log('[LinkedIn-Modal] Détection d\'un refus d\'accès');
      this.error = 'Vous avez refusé l\'accès à LinkedIn. Pour vous connecter, vous devez autoriser l\'application.';
    }
    
    // S'assurer que l'erreur n'est pas null avant de l'envoyer à la notification
    // Utiliser message comme fallback garantit qu'on a toujours une string valide
    const errorMessage = this.error || message;
    console.log('[LinkedIn-Modal] Message d\'erreur final:', errorMessage);
    
    // Vérifier si on est dans une iframe (pour éviter les toasts en double)
    const isInIframe = window.self !== window.top;
    console.log('[LinkedIn-Modal] En iframe ?: ' + isInIframe);
    
    // Notification visible dans l'application principale uniquement si on n'est pas dans une iframe
    if (!isInIframe) {
      console.log('[LinkedIn-Modal] Affichage de la notification d\'erreur dans la fenêtre principale');
      this.notificationService.loginError(errorMessage, 'linkedin');
    } else {
      console.log('[LinkedIn-Modal] En iframe - pas d\'affichage de notification');
    }
  }
}
