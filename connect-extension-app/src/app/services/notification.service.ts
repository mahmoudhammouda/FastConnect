import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  /**
   * Afficher une notification de succès avec une icône personnalisée
   */
  success(message: string, title: string = 'Succès') {
    this.toastr.success(
      `<div class="fc-toast-content">
        <i class="fas fa-check-circle fc-toast-icon success"></i>
        <div>${message}</div>
      </div>`, 
      title,
      { enableHtml: true }
    );
  }

  /**
   * Afficher une notification d'erreur avec une icône personnalisée
   */
  error(message: string, title: string = 'Erreur') {
    this.toastr.error(
      `<div class="fc-toast-content">
        <i class="fas fa-exclamation-circle fc-toast-icon error"></i>
        <div>${message}</div>
      </div>`, 
      title,
      { enableHtml: true }
    );
  }

  /**
   * Afficher une notification d'information avec une icône personnalisée
   */
  info(message: string, title: string = 'Information') {
    this.toastr.info(
      `<div class="fc-toast-content">
        <i class="fas fa-info-circle fc-toast-icon info"></i>
        <div>${message}</div>
      </div>`, 
      title,
      { enableHtml: true }
    );
  }

  /**
   * Afficher une notification pour la connexion
   */
  loginSuccess(provider: string = 'email') {
    let iconClass = 'fas fa-sign-in-alt';
    let message = 'Vous êtes connecté avec succès';
    
    if (provider === 'linkedin') {
      iconClass = 'fab fa-linkedin';
      message = 'Vous êtes connecté avec succès via LinkedIn';
    }
    
    this.toastr.success(
      `<div class="fc-toast-content">
        <i class="${iconClass} fc-toast-icon success"></i>
        <div>${message}</div>
      </div>`, 
      'Connexion réussie',
      { 
        enableHtml: true,
        timeOut: 10000
      }
    );
  }

  /**
   * Afficher une notification pour l'échec de connexion
   */
  loginError(errorMessage: string, provider: string = 'email') {
    let iconClass = 'fas fa-exclamation-triangle';
    let title = 'Échec de connexion';
    
    if (provider === 'linkedin') {
      iconClass = 'fab fa-linkedin';
      title = 'Échec de connexion LinkedIn';
    }
    
    this.toastr.error(
      `<div class="fc-toast-content">
        <i class="${iconClass} fc-toast-icon error"></i>
        <div>${errorMessage}</div>
      </div>`, 
      title,
      { 
        enableHtml: true,
        timeOut: 10000
      }
    );
  }
}
