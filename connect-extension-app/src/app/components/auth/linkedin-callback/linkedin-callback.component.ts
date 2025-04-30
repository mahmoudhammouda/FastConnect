import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';
import { LinkedInCallbackHandlerService } from '../../../services/linkedin-callback-handler.service';
import { ModalService } from '../../../services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-linkedin-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fc-linkedin-callback">
      <div class="fc-loading-container" *ngIf="isLoading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
        <p>Finalisation de l'authentification LinkedIn...</p>
      </div>
      
      <div class="fc-error-container" *ngIf="error">
        <p>{{ error }}</p>
        <p>Redirection vers la page principale...</p>
      </div>
    </div>
  `,
  styles: [`
    .fc-linkedin-callback {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
    }
    .fc-loading-container {
      text-align: center;
      padding: 20px;
      border-radius: 5px;
      background-color: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .fc-error-container {
      text-align: center;
      padding: 20px;
      border-radius: 5px;
      background-color: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      color: red;
    }
  `]
})
export class LinkedInCallbackComponent implements OnInit {
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private linkedInCallbackHandler: LinkedInCallbackHandlerService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    
    // Récupération des paramètres de la query string
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const state = params['state'];
      const error = params['error'];
      const errorDescription = params['error_description'];
      
      // Si nous sommes dans un contexte d'extension ou d'application web, nous ouvrons la modal
      const openInModal = window.location.pathname.indexOf('extension') === -1;
      
      // Déterminer si nous sommes dans un contexte de popup d'authentification
      const isInPopupWindow = window.opener !== null && window.opener !== undefined;

      // Traiter le callback via le service dédié
      this.linkedInCallbackHandler.processCallbackFromUrl(window.location.href);
      
      // S'il y a une erreur, l'afficher
      if (error) {
        this.handleError(`Erreur LinkedIn: ${error} - ${errorDescription || 'Aucune description'}`);
      } 
      // Si code est manquant, afficher l'erreur
      else if (!code) {
        this.handleError('Code d\'autorisation manquant dans la réponse LinkedIn');
      }
      // Si tout est ok, traiter le code
      else {
        // Dans l'extension, on traite directement le code
        if (!isInPopupWindow && window.location.pathname.indexOf('extension') !== -1) {
          this.processAuthCode(code, state || '');
        }
        
        // Si nous sommes dans une fenêtre popup, envoyer un message et fermer
        if (isInPopupWindow) {
          window.opener.postMessage({ 
            type: 'linkedin-auth-complete', 
            code: code, 
            state: state 
          }, '*');
          
          // Fermer cette fenêtre après un court délai
          setTimeout(() => {
            window.close();
          }, 500);
        } else {
          // Si ce n'est pas une fenêtre popup, rediriger vers la page principale
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        }
      }
    });
  }

  private processAuthCode(code: string, state: string): void {
    this.authService.linkedInCallback(code, state).subscribe({
      next: (response) => {
        console.log('Callback LinkedIn réussi:', response);
        
        if (response && response.token) {
          // Stockage du token JWT
          localStorage.setItem('auth_token', response.token);
          // Stockage des informations utilisateur
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          
          this.notificationService.loginSuccess('linkedin');
          
          // Délai court pour permettre au toast de s'afficher
          setTimeout(() => {
            console.log('Redirection vers la page principale...');
            // Redirection vers la page principale
            this.router.navigate(['/']);
            
            // En cas de problème avec le routeur, utiliser aussi une redirection directe
            if (!this.router.navigated) {
              console.log('Navigation par routeur non détectée, redirection manuelle');
              window.location.href = '/';
            }
          }, 1000);
        } else {
          this.handleError('Réponse d\'authentification invalide');
        }
      },
      error: (error) => {
        console.error('Erreur lors du traitement du callback LinkedIn:', error);
        let errorMessage = 'Erreur lors de l\'authentification LinkedIn';
        
        if (error instanceof HttpErrorResponse) {
          errorMessage = error.error?.message || error.message || errorMessage;
        }
        
        this.handleError(errorMessage);
      }
    });
  }

  private handleError(message: string): void {
    this.isLoading = false;
    console.error('Erreur LinkedIn callback:', message);
    this.notificationService.loginError(message, 'linkedin');
    // Redirection vers la page principale même en cas d'erreur
    setTimeout(() => {
      console.log('Redirection vers la page principale après erreur...');
      this.router.navigate(['/']);
      
      // En cas de problème avec le routeur, utiliser aussi une redirection directe
      if (!this.router.navigated) {
        console.log('Navigation par routeur non détectée, redirection manuelle');
        window.location.href = '/';
      }
    }, 2000);
  }
}
