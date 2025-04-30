import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';
import { LinkedInCallbackHandlerService } from '../../../services/linkedin-callback-handler.service';
import { ModalService } from '../../../services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of, timer } from 'rxjs';

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
    private modalService: ModalService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    console.log('[LinkedIn-Callback] Composant initialisé');
    console.log('[LinkedIn-Callback] URL complete:', window.location.href);
    console.log('[LinkedIn-Callback] UserAgent:', navigator.userAgent);
    console.log('[LinkedIn-Callback] Dimensions fenêtre:', window.innerWidth, 'x', window.innerHeight);
    
    // S'assurer que nous sommes dans la zone Angular pour les mises à jour d'UI
    this.ngZone.run(() => {
      // Récupération des paramètres de la query string
      console.log('[LinkedIn-Callback] Attente des paramètres de l\'URL');
      this.route.queryParams.subscribe(params => {
        console.log('[LinkedIn-Callback] Paramètres reçus:', params);
        const code = params['code'];
        const state = params['state'];
        const error = params['error'];
        const errorDescription = params['error_description'];
        
        console.log('[LinkedIn-Callback] Paramètre code présent:', !!code, code ? '(longueur: ' + code.length + ')' : '');
        console.log('[LinkedIn-Callback] Paramètre state présent:', !!state);
        console.log('[LinkedIn-Callback] Paramètre error présent:', !!error);
        
        // Déterminer si nous sommes dans un contexte de popup d'authentification
        const isInPopupWindow = window.opener !== null && window.opener !== undefined;
        console.log('[LinkedIn-Callback] Est dans une fenêtre popup:', isInPopupWindow);

        // S'il y a une erreur, l'afficher
        if (error) {
          console.error('[LinkedIn-Callback] Erreur dans les paramètres:', error);
          console.error('[LinkedIn-Callback] Description de l\'erreur:', errorDescription);
          this.handleError(`Erreur LinkedIn: ${error} - ${errorDescription || 'Aucune description'}`);
        } 
        // Si code est manquant, afficher l'erreur
        else if (!code) {
          console.error('[LinkedIn-Callback] Code d\'autorisation manquant dans la réponse');
          this.handleError('Code d\'autorisation manquant dans la réponse LinkedIn');
        }
        // Si tout est ok, traiter le code
        else {
          console.log('[LinkedIn-Callback] Code d\'autorisation reçu avec succès, traitement en cours...');
          console.log('[LinkedIn-Callback] Code: ' + code.substring(0, 10) + '...');
          console.log('[LinkedIn-Callback] State: ' + (state || 'non fourni'));
          
          // Si nous sommes dans une fenêtre popup
          if (isInPopupWindow) {
            console.log('[LinkedIn-Callback] Mode popup détecté, préparation à communiquer avec la fenêtre principale');
            
            // Effectuer l'authentification directement dans la popup
            console.log('[LinkedIn-Callback] Lancement de l\'authentification dans la popup');
            this.processAuthCode(code, state || '');
            
            // Informer la fenêtre principale que l'authentification est terminée avec tous les détails
            console.log('[LinkedIn-Callback] Délai de 1s avant d\'envoyer le message à la fenêtre principale');
            setTimeout(() => {
              if (window.opener) {
                console.log('[LinkedIn-Callback] Préparation du message pour la fenêtre principale');
                const token = localStorage.getItem('auth_token');
                const user = localStorage.getItem('user');
                const hasToken = token && user;
                
                console.log('[LinkedIn-Callback] Token présent:', !!token);
                console.log('[LinkedIn-Callback] User présent:', !!user);
                console.log('[LinkedIn-Callback] État d\'authentification:', hasToken ? 'SUCCES' : 'ECHEC');
                
                const message = { 
                  type: 'linkedin-auth-complete', 
                  success: hasToken,
                  error: this.error,
                  hasToken: hasToken,
                  source: 'linkedin-callback',
                  shouldNotify: true  // Indiquer que la fenêtre principale doit afficher la notification
                };
                
                console.log('[LinkedIn-Callback] Envoi du message à la fenêtre principale:', message);
                window.opener.postMessage(message, '*');
                
                console.log('[LinkedIn-Callback] Message envoyé avec succès');
                
                // Attendre un peu plus longtemps avant de fermer la fenêtre pour permettre à la requête API de se terminer
                // Ne PAS fermer la fenêtre trop rapidement pour éviter les erreurs de requête interrompue
                console.log('[LinkedIn-Callback] Attente de 2s avant fermeture de la popup...');
                setTimeout(() => {
                  console.log('[LinkedIn-Callback] Fermeture de la fenêtre popup');
                  window.close();
                }, 2000);
              } else {
                console.error('[LinkedIn-Callback] ERREUR: Fenêtre parent introuvable, impossible de communiquer');
              }
            }, 1000);
          } else {
            // Dans l'application normale ou l'extension
            console.log('[LinkedIn-Callback] Mode application principale détecté');
            console.log('[LinkedIn-Callback] Traitement direct du code dans l\'application principale');
            this.processAuthCode(code, state || '');
            
            // Rediriger vers la page principale après un délai
            console.log('[LinkedIn-Callback] Préparation redirection vers la page d\'accueil dans 1.5s');
            setTimeout(() => {
              console.log('[LinkedIn-Callback] Redirection vers la page d\'accueil');
              this.router.navigate(['/']);
            }, 1500);
          }
        }
      });
    });
  }

  /**
   * Traiter le code d'autorisation pour obtenir un token
   */
  private processAuthCode(code: string, state: string): void {
    console.log('[LinkedIn-Callback] Début du traitement du code d\'autorisation');
    console.log('[LinkedIn-Callback] Code (partiel):', code.substring(0, 10) + '...');
    console.log('[LinkedIn-Callback] State:', state);
    
    this.isLoading = true;
    
    // Utiliser le service d'authentification pour traiter le code
    console.log('[LinkedIn-Callback] Appel à authService.linkedInCallback()');
    this.authService.linkedInCallback(code, state).subscribe({
      next: (response) => {
        console.log('[LinkedIn-Callback] Réponse du serveur reçue:', response ? 'données valides' : 'réponse vide');
        
        // Gérer la réponse du serveur
        if (response && response.token) {
          console.log('[LinkedIn-Callback] Token présent dans la réponse - Authentification réussie!'); 
          console.log('[LinkedIn-Callback] Token (début):', response.token.substring(0, 15) + '...');
          
          // Stocker le token JWT
          localStorage.setItem('auth_token', response.token);
          console.log('[LinkedIn-Callback] Token enregistré dans localStorage');

          // Stocker les informations utilisateur si disponibles
          if (response.user) {
            console.log('[LinkedIn-Callback] Informations utilisateur présentes:', response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            console.log('[LinkedIn-Callback] Informations utilisateur enregistrées dans localStorage');
          } else {
            console.log('[LinkedIn-Callback] Aucune information utilisateur dans la réponse');
          }
          
          this.isLoading = false;
          
          // Informer la fenêtre principale avant d'envoyer la notification
          if (window.opener) {
            try {
              console.log('[LinkedIn-Callback] Préparation du message pour la fenêtre principale');
              const token = localStorage.getItem('auth_token');
              const user = localStorage.getItem('user');
              const hasToken = token && user;
              
              console.log('[LinkedIn-Callback] Token présent:', !!token);
              console.log('[LinkedIn-Callback] User présent:', !!user);
              console.log('[LinkedIn-Callback] État d\'authentification:', hasToken ? 'SUCCES' : 'ECHEC');
              
              const message = { 
                type: 'linkedin-auth-complete', 
                success: hasToken,
                error: this.error,
                hasToken: hasToken,
                source: 'linkedin-callback',
                shouldNotify: true  // Indiquer que la fenêtre principale doit afficher la notification
              };
              
              console.log('[LinkedIn-Callback] Envoi du message à la fenêtre principale:', message);
              window.opener.postMessage(message, '*');
              
              console.log('[LinkedIn-Callback] Message envoyé avec succès');
              
              // Attendre que la requête API puisse terminer avant de fermer la popup
              // Ne PAS fermer la fenêtre trop rapidement pour éviter les erreurs de requête interrompue
              console.log('[LinkedIn-Callback] Délai de 2s avant tentative de fermeture de la popup');
              setTimeout(() => {
                console.log('[LinkedIn-Callback] Tentative de fermeture de la popup');
                window.close();
              }, 2000);
            } catch (e) {
              console.error('Erreur lors de l\'envoi du message à la fenêtre principale:', e);
              this.notificationService.loginError('Erreur lors de l\'authentification LinkedIn', 'linkedin');
            }
          }
          
          // IMPORTANT: Forcer le rafraîchissement de l'état d'authentification
          console.log('[LinkedIn-Callback] Rafraichissement de l\'etat d\'authentification via authService.refreshAuthState()');
          this.authService.refreshAuthState();
          
          // Ne pas afficher de notification dans cette fenêtre, uniquement communiquer avec la fenêtre principale
          console.log('[LinkedIn-Callback] Notification désactivée dans cette fenêtre (sera gérée par la fenêtre principale)');
          // this.notificationService.loginSuccess('linkedin');
          
          // Attendre que la requête API puisse terminer avant de fermer la popup
          // Ne PAS fermer la fenêtre trop rapidement pour éviter les erreurs de requête interrompue
          console.log('[LinkedIn-Callback] Délai de 2s avant tentative de fermeture de la popup');
          setTimeout(() => {
            console.log('[LinkedIn-Callback] Tentative de fermeture de la popup');
            window.close();
          }, 2000);
        } else if (response) {
          this.handleError('Réponse d\'authentification invalide');
        }
      },
      error: (error: any) => {
        this.handleError('Erreur lors de l\'authentification LinkedIn: ' + 
          (error.error?.message || error.message || 'Erreur inconnue'));
      }
    });
  }

  /**
   * Gérer les erreurs d'authentification
   */
  private handleError(message: string): void {
    // Assurer que nous sommes dans la zone Angular pour les mises à jour d'UI
    this.ngZone.run(() => {
      this.isLoading = false;
      this.error = message;
      console.error('Erreur LinkedIn callback:', message);
      
      // Si nous sommes dans une fenêtre popup, informer la fenêtre parente de l'erreur
      if (window.opener) {
        try {
          // Envoyer le message d'erreur à la fenêtre principale avant d'afficher la notification
          window.opener.postMessage({
            type: 'linkedin-auth-complete',
            success: false,
            error: message,
            source: 'linkedin-callback-error',
            shouldNotify: true  // Indiquer que la fenêtre principale doit afficher la notification
          }, '*');
          
          // Ne pas afficher de notification dans cette fenêtre, uniquement communiquer avec la fenêtre principale
          console.log('[LinkedIn-Callback] Notification désactivée dans cette fenêtre (sera gérée par la fenêtre principale)');
          // this.notificationService.loginError(message, 'linkedin');
          
          // Attendre que la requête API puisse terminer avant de fermer la popup
          // Ne PAS fermer la fenêtre trop rapidement pour éviter les erreurs de requête interrompue
          console.log('[LinkedIn-Callback] Délai de 2s avant tentative de fermeture de la popup');
          setTimeout(() => {
            console.log('[LinkedIn-Callback] Tentative de fermeture de la popup');
            window.close();
          }, 2000);
        } catch (e) {
          console.error('Erreur lors de l\'envoi du message à la fenêtre principale:', e);
          this.notificationService.loginError(message, 'linkedin');
        }
      } else {
        // Ne pas afficher de notification dans cette fenêtre si on est dans une iframe/popup
        // Vérifier si on est dans une iframe
        const isInIframe = window.self !== window.top;
        if (!isInIframe) {
          this.notificationService.loginError(message, 'linkedin');
        }
        
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
    });
  }
}
