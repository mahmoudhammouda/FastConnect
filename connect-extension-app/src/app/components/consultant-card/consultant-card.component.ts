import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultantWithTags, ExperienceLevel } from '../../models/consultant.model';
import { BookmarkList, BookmarkState } from '../../models/bookmark.model';
import { BookmarkService } from '../../services/bookmark.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consultant-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultant-card.component.html',
  styleUrls: ['./consultant-card.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ConsultantCardComponent implements OnInit, OnDestroy {
  @Input() consultant!: ConsultantWithTags;
  @Input() expanded: boolean = false;
  @Input() messageExpanded: boolean = false;
  @Input() detailsExpanded: boolean = false; // Propriété pour l'affichage des détails
  @Input() dropdownOpen: boolean = false; // Propriété pour la compatibilité avec le composant parent
  
  // Propriété pour gérer l'ouverture du menu d'actions sur mobile
  mobileActionsOpen: string | null = null;
  
  // Propriété pour gérer l'ouverture du menu déroulant en mode desktop (usage interne)
  activeDropdownId: string | null = null;
  
  // Propriétés pour gérer les favoris
  bookmarkDropdownOpen: string | null = null;
  bookmarkSubscription!: Subscription;
  bookmarkLists: BookmarkList[] = [];
  isCreatingNewList: boolean = false;
  newListName: string = '';
  bookmarkStatusMessage: string = '';
  bookmarkMessageTimeout: any;
  // Pour savoir si un consultant est déjà dans au moins une liste de favoris
  isBookmarked: boolean = false;

  @Output() linkedinClick = new EventEmitter<string>();
  @Output() phoneClick = new EventEmitter<string | null>();
  @Output() emailClick = new EventEmitter<string | null>();
  @Output() toggleExpansion = new EventEmitter<{id: string, expanded: boolean}>();
  @Output() toggleDropdown = new EventEmitter<{id: string, event: MouseEvent}>();
  @Output() toggleMessageExpansion = new EventEmitter<{id: string, event: MouseEvent}>();
  @Output() toggleDetailsExpansion = new EventEmitter<{id: string, event: MouseEvent}>(); // Nouvel événement pour afficher/masquer les détails
  
  constructor(public bookmarkService: BookmarkService) {}

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
  
  /**
   * Initialisation du composant : souscription aux favoris
   */
  ngOnInit(): void {
    this.bookmarkSubscription = this.bookmarkService.getBookmarkState().subscribe(state => {
      this.bookmarkLists = state.lists;
      this.updateBookmarkStatus();
    });
  }
  
  /**
   * Nettoyage lors de la destruction du composant
   */
  ngOnDestroy(): void {
    if (this.bookmarkSubscription) {
      this.bookmarkSubscription.unsubscribe();
    }
    if (this.bookmarkMessageTimeout) {
      clearTimeout(this.bookmarkMessageTimeout);
    }
  }
  
  /**
   * Met à jour le statut de favori pour le consultant actuel
   */
  updateBookmarkStatus(): void {
    if (this.consultant) {
      this.isBookmarked = this.bookmarkService.isConsultantBookmarked(this.consultant.id);
    }
  }
  
  /**
   * Bascule l'ouverture/fermeture du dropdown de favoris
   * @param event L'événement de clic
   * @param consultantId ID du consultant
   */
  toggleBookmarkDropdown(event: MouseEvent, consultantId: string): void {
    event.stopPropagation();
    
    // Ferme le menu si déjà ouvert pour ce consultant
    if (this.bookmarkDropdownOpen === consultantId) {
      this.bookmarkDropdownOpen = null;
      this.isCreatingNewList = false;
      this.newListName = '';
    } else {
      // Ouvre le menu pour ce consultant et ferme autres menus
      this.bookmarkDropdownOpen = consultantId;
      this.mobileActionsOpen = null; // Ferme le menu d'actions mobile
      this.activeDropdownId = null; // Ferme le menu des 3 points desktop
    }
  }
  
  /**
   * Ajoute le consultant actuel à une liste de favoris existante
   * @param listId ID de la liste de favoris
   * @param event L'événement de clic
   */
  addToBookmarkList(listId: string, event: MouseEvent): void {
    event.stopPropagation();
    
    if (this.bookmarkService.addConsultantToList(listId, this.consultant.id)) {
      const list = this.bookmarkLists.find(l => l.id === listId);
      this.showBookmarkMessage(`Consultant ajouté à la liste "${list?.name}"`);      
    } else {
      this.showBookmarkMessage('Erreur lors de l\'ajout aux favoris', true);
    }
    
    this.bookmarkDropdownOpen = null;
  }
  
  /**
   * Commence la création d'une nouvelle liste de favoris
   * @param event L'événement de clic
   */
  startCreatingNewList(event: MouseEvent): void {
    event.stopPropagation();
    this.isCreatingNewList = true;
    this.newListName = '';
    // Focus sur le champ de texte avec un petit délai pour laisser le DOM se mettre à jour
    setTimeout(() => {
      const input = document.getElementById('new-list-input');
      if (input) {
        input.focus();
      }
    }, 50);
  }
  
  /**
   * Crée une nouvelle liste de favoris
   * @param event L'événement de soumission
   */
  createNewBookmarkList(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (!this.newListName || this.newListName.trim() === '') {
      return;
    }
    
    const listId = this.bookmarkService.createBookmarkList(this.newListName.trim(), this.consultant.id);
    if (listId) {
      this.showBookmarkMessage(`Consultant ajouté à la nouvelle liste "${this.newListName.trim()}"`);      
    } else {
      this.showBookmarkMessage('Erreur lors de la création de la liste', true);
    }
    
    this.isCreatingNewList = false;
    this.newListName = '';
    this.bookmarkDropdownOpen = null;
  }
  
  /**
   * Annule la création d'une nouvelle liste
   * @param event L'événement de clic
   */
  cancelNewList(event: MouseEvent): void {
    event.stopPropagation();
    this.isCreatingNewList = false;
    this.newListName = '';
  }
  
  /**
   * Affiche un message temporaire de statut de l'opération de bookmark
   * @param message Le message à afficher
   * @param isError Indique s'il s'agit d'une erreur (pour styliser différemment)
   * @param duration Durée d'affichage en ms (par défaut 3000ms)
   */
  showBookmarkMessage(message: string, isError: boolean = false, duration: number = 3000): void {
    this.bookmarkStatusMessage = message;
    
    // Efface le timeout précédent s'il existe
    if (this.bookmarkMessageTimeout) {
      clearTimeout(this.bookmarkMessageTimeout);
    }
    
    // Définit un nouveau timeout pour effacer le message
    this.bookmarkMessageTimeout = setTimeout(() => {
      this.bookmarkStatusMessage = '';
    }, duration);
  }
}
