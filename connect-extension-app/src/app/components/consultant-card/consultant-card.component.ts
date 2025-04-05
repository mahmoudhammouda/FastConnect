import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantWithTags, ExperienceLevel } from '../../models/consultant.model';
import { ConsultantDetailSectionsComponent } from '../consultant-detail-sections/consultant-detail-sections.component';

@Component({
  selector: 'app-consultant-card',
  standalone: true,
  imports: [CommonModule, ConsultantDetailSectionsComponent],
  templateUrl: './consultant-card.component.html',
  styleUrls: ['./consultant-card.component.css']
})
export class ConsultantCardComponent {
  @Input() consultant!: ConsultantWithTags;
  @Input() expanded: boolean = false;
  @Input() messageExpanded: boolean = false;
  @Input() dropdownOpen: boolean = false;
  @Input() detailsExpanded: boolean = false; // Nouvelle propriété pour l'affichage des détails

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
    this.toggleExpansion.emit({id, expanded: !this.expanded});
  }

  onToggleDropdown(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.toggleDropdown.emit({id, event});
  }

  onToggleMessageExpansion(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.toggleMessageExpansion.emit({id, event});
  }

  onToggleDetailsExpansion(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.toggleDetailsExpansion.emit({id, event});
  }
}
