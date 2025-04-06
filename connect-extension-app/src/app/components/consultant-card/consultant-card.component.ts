import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantWithTags, ExperienceLevel } from '../../models/consultant.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-consultant-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultant-card.component.html',
  styleUrls: ['./consultant-card.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ConsultantCardComponent {
  @Input() consultant!: ConsultantWithTags;
  @Input() expanded: boolean = false;
  @Input() messageExpanded: boolean = false;
  @Input() detailsExpanded: boolean = false; // Propriété pour l'affichage des détails
  @Input() dropdownOpen: boolean = false; // Propriété pour la compatibilité avec le composant parent
  
  // Propriété pour gérer l'ouverture du menu d'actions sur mobile
  mobileActionsOpen: string | null = null;
  
  // Propriété pour gérer l'ouverture du menu déroulant en mode desktop (usage interne)
  activeDropdownId: string | null = null;

  @Output() linkedinClick = new EventEmitter<string>();
  @Output() phoneClick = new EventEmitter<string | null>();
  @Output() emailClick = new EventEmitter<string | null>();
  @Output() toggleExpansion = new EventEmitter<{id: string, expanded: boolean}>();
  @Output() toggleDropdown = new EventEmitter<{id: string, event: MouseEvent}>();
  @Output() toggleMessageExpansion = new EventEmitter<{id: string, event: MouseEvent}>();
  @Output() toggleDetailsExpansion = new EventEmitter<{id: string, event: MouseEvent}>(); // Nouvel événement pour afficher/masquer les détails

  /**
   * Get the experience level as 1-3 bars
   */
  getSeniorityBars(experience: ExperienceLevel): number {
    if (experience === 'less_than_3') return 1;
    if (experience === 'between_3_and_10') return 2;
    return 3;
  }
  
  /**
   * Get the experience level as a human-readable label
   */
  getExperienceLabel(experience: ExperienceLevel): string {
    if (experience === 'less_than_3') return 'Junior';
    if (experience === 'between_3_and_10') return 'Confirmé';
    return 'Senior';
  }

  /**
   * Format message with highlighted hashtags
   */
  formatMessage(message: string): string {
    return message.replace(/#(\w+)/g, '<span class="text-blue-600 text-xs font-medium hover:text-blue-800 transition-colors duration-300">#$1</span>');
  }
  
  /**
   * Check if a message is long enough to be truncated
   * Utilise une combinaison de longueur et de nombre de lignes pour
   * déterminer si un message doit être tronqué
   * Algorithme optimisé pour considérer TOUS les messages comme "longs"
   * afin de toujours afficher le bouton "Voir tout le message"
   */
  isMessageLong(message: string): boolean {
    // Si le message est vide, il n'est pas long
    if (!message || message.trim() === '') return false;
    
    // IMPORTANT: Force la plupart des messages à être considérés comme longs
    // Pour garantir l'affichage du bouton "Voir tout le message"
    return true;
    
    /* Ancien algorithme désactivé pour forcer l'affichage du bouton
    // Si le message dépasse un certain nombre de caractères (réduit à 80)
    if (message.length > 80) return true;
    
    // Si le message contient plusieurs lignes (toute ligne additionnelle compte)
    const lineCount = (message.match(/\n/g) || []).length + 1;
    if (lineCount > 1) return true;
    
    // Si le message contient beaucoup de mots (réduit à 12)
    const wordCount = message.split(/\s+/).length;
    if (wordCount > 12) return true;
    
    // Estimation supplémentaire: si le message a plus de 55 caractères, il occupe probablement plus de 3 lignes
    if (message.length > 55 && message.includes(' ')) return true;
    
    return false;
    */
  }

  onLinkedInClick(url: string, event: MouseEvent): void {
    event.stopPropagation();
    if (this.consultant.linkedinValidated) {
      this.linkedinClick.emit(url);
    }
  }
  
  // Alias pour assurer la compatibilité avec les appels existants
  onLinkedinClick(url: string, event: MouseEvent): void {
    this.onLinkedInClick(url, event);
  }

  onPhoneClick(phone: string | null, event: MouseEvent): void {
    event.stopPropagation();
    if (this.consultant.phoneValidated) {
      this.phoneClick.emit(phone);
    }
  }

  onEmailClick(email: string | null, event: MouseEvent): void {
    event.stopPropagation();
    if (this.consultant.emailValidated) {
      this.emailClick.emit(email);
    }
  }

  onToggleExpansion(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.detailsExpanded = false;
    this.messageExpanded = false;
    this.activeDropdownId = null;
    this.toggleExpansion.emit({id, expanded: !this.messageExpanded});
  }

  /**
   * Toggle menu d'actions pour mobile
   * @param event L'événement de clic
   * @param consultantId L'ID du consultant pour lequel ouvrir/fermer le menu
   */
  toggleMobileActions(event: MouseEvent, consultantId: string): void {
    event.stopPropagation();
    if (this.mobileActionsOpen === consultantId) {
      this.mobileActionsOpen = null;
    } else {
      this.mobileActionsOpen = consultantId;
      // Fermer le dropdown desktop si ouvert
      this.activeDropdownId = null;
    }
  }
  
  /**
   * Gère l'ouverture/fermeture du menu déroulant
   * @param consultantId L'ID du consultant concerné
   * @param event L'événement de clic
   */
  onToggleDropdown(consultantId: string, event: MouseEvent): void {
    event.stopPropagation();
    if (this.activeDropdownId === consultantId) {
      this.activeDropdownId = null;
    } else {
      this.activeDropdownId = consultantId;
      // Fermer le menu mobile si ouvert
      this.mobileActionsOpen = null;
    }
    // Émettre l'événement pour informer le composant parent
    this.toggleDropdown.emit({id: consultantId, event});
  }

  onToggleMessageExpansion(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.toggleMessageExpansion.emit({id, event});
  }

  onToggleDetailsExpansion(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.toggleDetailsExpansion.emit({id, event});
  }
  
  /**
   * Vérifie si le menu déroulant est ouvert pour un consultant spécifique
   * @param consultantId L'ID du consultant à vérifier
   * @returns true si le menu est ouvert pour ce consultant
   */
  isDropdownOpen(consultantId: string): boolean {
    // Utilise soit l'entrée du composant parent soit notre état interne
    return !!this.dropdownOpen || this.activeDropdownId === consultantId;
  }
}
