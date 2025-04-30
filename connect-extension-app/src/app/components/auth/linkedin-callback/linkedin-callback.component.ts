import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-linkedin-callback',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="fc-linkedin-callback">
    <div class="fc-loading-container" *ngIf="isLoading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <p>Finalisation de l'authentification LinkedIn...</p>
    </div>
  </div>`,
  styles: [`
    .fc-linkedin-callback {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f9f9f9;
    }
    .fc-loading-container {
      text-align: center;
      padding: 20px;
      border-radius: 5px;
      background-color: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
  `]
})
export class LinkedInCallbackComponent implements OnInit {
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    // Récupération du code d'autorisation et de l'état depuis l'URL
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const state = params['state'];
      
      if (code && state) {
        // Appel au backend pour échanger le code contre un token
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
            this.handleError('Erreur lors de l\'authentification LinkedIn: ' + 
                            (error.error?.message || error.message || 'Erreur inconnue'));
          }
        });
      } else if (params['error']) {
        // Gestion des erreurs renvoyées par LinkedIn
        this.handleError(`Erreur LinkedIn: ${params['error_description'] || params['error']}`);
      } else {
        this.handleError('Paramètres manquants dans la requête de callback');
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
