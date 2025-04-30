import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';
import { LinkedInCallbackHandlerService } from '../../../services/linkedin-callback-handler.service';

@Component({
  selector: 'app-linkedin-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fc-linkedin-modal-content">
      <!-- État de chargement initial -->
      <div *ngIf="isLoading && !linkedinUrl" class="fc-loading-container">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
        <p>Authentification LinkedIn en cours dans une fenêtre séparée...</p>
        <p class="fc-linkedin-info">Veuillez compléter l'authentification dans la fenêtre qui s'est ouverte.</p>
      </div>
      
      <!-- Message d'erreur -->
      <div *ngIf="error" class="fc-linkedin-error">
        <div class="fc-linkedin-error-icon">
          <i class="fas fa-exclamation-circle"></i>
        </div>
        <p>{{ error }}</p>
        <button 
          (click)="cancel.emit()" 
          class="fc-linkedin-back-button"
        >
          Retour
        </button>
      </div>
      
      <!-- Bouton d'annulation -->
      <button 
        *ngIf="!error && linkedinUrl"
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
    
    .fc-linkedin-back-button {
      margin-top: 15px;
      padding: 8px 16px;
      background-color: #f3f4f6;
      border: 1px solid #d1d5db;
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
  @Input() redirectBackUrl: string = '/';
  @Output() success = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  
  isLoading = true;
  linkedinUrl: string | null = null;
  safeLinkedinUrl: SafeResourceUrl | null = null;
  error: string | null = null;
  
  // Intervalle pour surveiller le callback
  private checkIntervalId: any;
  
  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private notificationService: NotificationService,
    private linkedInCallbackHandler: LinkedInCallbackHandlerService
  ) {}
  
  ngOnInit(): void {
    this.initializeLinkedInAuth();
    this.setupCallbackListener();
    
    // S'abonner aux événements de callback
    this.linkedInCallbackHandler.getCallbackEvents().subscribe(event => {
      if (event) {
        if (event.success) {
          this.success.emit(event.data);
        } else if (event.error) {
          this.error = event.error;
          this.isLoading = false;
        }
      }
    });
  }
  
  ngOnDestroy(): void {
    if (this.checkIntervalId) {
      clearInterval(this.checkIntervalId);
    }
    window.removeEventListener('message', this.handleCallback);
  }
  
  private initializeLinkedInAuth(): void {
    this.authService.getLinkedInAuthUrl().subscribe({
      next: (response) => {
        // Redirection directe au lieu d'utiliser une iframe pour éviter les problèmes de dépendance circulaire
        window.open(response.url, '_blank', 'width=600,height=600');
        this.isLoading = true;
        
        // Au lieu d'afficher l'iframe, on affiche un message indiquant que l'authentification se déroule dans une fenêtre séparée
        this.linkedinUrl = null;
        
        // Vérifier périodiquement si l'authentification a réussi
        this.setupCallbackListener();
      },
      error: (error) => {
        this.isLoading = false;
        this.error = "Impossible de se connecter à LinkedIn. Veuillez réessayer plus tard.";
        console.error('Erreur LinkedIn redirect:', error);
      }
    });
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
    console.log('Message reçu:', event.data);
    
    // Vérifier si le message est de notre popup d'authentification LinkedIn
    if (event.data && event.data.type === 'linkedin-auth-complete') {
      console.log('Auth LinkedIn terminée dans le popup:', event.data);
      
      // Si le message contient un code d'autorisation
      if (event.data.code) {
        this.processAuthCode(event.data.code, event.data.state || '');
      } else {
        // Vérifier le localStorage au cas où le token a déjà été enregistré
        this.checkForAuthCode();
      }
    }
  }
  
  private checkForAuthCode(): void {
    // Cette méthode vérifie maintenant si la fenêtre d'authentification a été fermée
    // Si elle a été fermée, nous vérifions dans le localStorage si l'utilisateur a été authentifié
    try {
      // Vérifier si un token d'authentification a été ajouté au localStorage entre-temps
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        // L'authentification a réussi
        this.success.emit({
          token,
          user: JSON.parse(user)
        });
        
        // Arrêter la vérification
        if (this.checkIntervalId) {
          clearInterval(this.checkIntervalId);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
    }
  }
  
  private processAuthCode(code: string, state: string): void {
    this.isLoading = true;
    
    // Utiliser le service pour traiter le code d'autorisation
    this.linkedInCallbackHandler.processCallbackFromUrl(
      `${window.location.origin}/auth/linkedin/callback?code=${code}&state=${state}`
    );
  }
  
  private handleError(message: string): void {
    this.isLoading = false;
    this.error = message;
    this.notificationService.loginError(message, 'linkedin');
  }
}
