import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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
  // Propriétés pour les dropdowns et onglets
  @Input() consultant!: ConsultantWithTags;
  @Input() consultantsList: ConsultantWithTags[] = [];
  @Input() viewMode: 'desktop' | 'mobile' = 'desktop';
  @Input() index!: number;
  @Input() expanded: boolean = false;
  @Input() messageExpanded: boolean = false;
  @Input() detailsExpanded: boolean = false; // Propriété pour l'affichage des détails
  @Input() dropdownOpen: boolean = false; // Propriété pour la compatibilité avec le composant parent
  
  // Propriétés pour le positionnement intelligent des dropdowns
  dropdownPosition: 'top' | 'bottom' = 'bottom';
  
  // Propriété pour gérer l'ouverture du menu d'actions sur mobile
  mobileActionsOpen: string | null = null;
  
  // Propriété pour gérer l'ouverture du menu déroulant en mode desktop (usage interne)
  activeDropdownId: string | null = null;
  
  // Propriétés pour gérer les favoris
  bookmarkDropdownOpen: string | null = null;
  bookmarkSubscription!: Subscription;
  bookmarkLists: BookmarkList[] = [];
  isCreatingNewList = false;
  bookmarkDropdownPosition: 'top' | 'bottom' = 'bottom';
  newListName: string = '';
  
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
      // Détermine la position optimale de la dropdown
      const buttonElement = (event.currentTarget as Element);
      this.dropdownPosition = this.calculateDropdownPosition(buttonElement, 200);
      
      this.mobileActionsOpen = consultantId;
      this.bookmarkDropdownOpen = null; // Fermer le dropdown de favoris s'il est ouvert
      this.isCreatingNewList = false; // Réinitialiser la création de liste
    }
  }
  
  /**
   * Gère l'ouverture/fermeture du menu déroulant
   * @param consultantId L'ID du consultant concerné
   * @param event L'événement de clic
   */
  onToggleDropdown(consultantId: string, event: MouseEvent): void {
    // Empêche la propagation pour éviter que le clic ne ferme immédiatement le menu
    event.stopPropagation();
    
    if (this.activeDropdownId === consultantId) {
      // Fermeture du menu s'il est déjà ouvert
      this.activeDropdownId = null;
    } else {
      // Détermine la position optimale de la dropdown
      const buttonElement = (event.currentTarget as Element);
      this.dropdownPosition = this.calculateDropdownPosition(buttonElement, 150); // Menu des actions est plus petit

      // Ouverture du menu et fermeture des autres menus
      this.activeDropdownId = consultantId;
      this.bookmarkDropdownOpen = null; // Ferme les dropdowns de bookmark
      this.isCreatingNewList = false;
    }
    
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
   * Calcule la position optimale d'une dropdown (haut ou bas) en fonction de l'espace disponible
   * @param buttonElement L'élément bouton qui a déclenché la dropdown
   * @param dropdownHeight Estimation de la hauteur de la dropdown en pixels (par défaut 300px)
   * @returns 'top' si la dropdown doit s'afficher vers le haut, 'bottom' sinon
   */
  calculateDropdownPosition(buttonElement: Element, dropdownHeight: number = 300): 'top' | 'bottom' {
    // Récupère la position du bouton par rapport à la fenêtre
    const buttonRect = buttonElement.getBoundingClientRect();
    
    // Calcule l'espace disponible en dessous du bouton
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    
    // Si l'espace en dessous est insuffisant et l'espace au-dessus est suffisant
    // positionne la dropdown vers le haut
    if (spaceBelow < dropdownHeight && buttonRect.top > dropdownHeight) {
      return 'top';
    }
    
    // Par défaut, positionne vers le bas
    return 'bottom';
  }
  
  /**
   * Bascule l'ouverture/fermeture du dropdown de favoris
   * @param event L'événement de clic
   * @param consultantId ID du consultant
   */
  toggleBookmarkDropdown(event: MouseEvent, consultantId: string): void {
    event.stopPropagation();
    
    // Mise à jour de la liste des favoris
    this.bookmarkLists = this.bookmarkService.getBookmarkLists();
    
    // Détermine si la dropdown doit être ouverte ou fermée
    if (this.bookmarkDropdownOpen === consultantId) {
      this.bookmarkDropdownOpen = null; // Fermer si déjà ouvert
      this.isCreatingNewList = false;
      this.newListName = '';
    } else {
      // Ouvrir pour ce consultant
      this.bookmarkDropdownOpen = consultantId;
      
      // Ferme les autres menus pour éviter les conflits d'interface
      this.mobileActionsOpen = null; // Ferme le menu d'actions mobile
      this.activeDropdownId = null; // Ferme le menu des 3 points desktop
      
      // Force la position de la dropdown en dessous du bouton
      this.bookmarkDropdownPosition = 'bottom';
      
      // Log pour débogage
      console.log("[ConsultantCard] Dropdown bookmark positionnée en dessous du bouton via CSS");
    }
  }
  
  /**
   * Gestion de l'ajout ou du retrait d'un consultant d'une liste en fonction de l'état de la case à cocher
   * @param listId ID de la liste de favoris
   * @param event L'événement de changement de la case à cocher
   */
  toggleBookmarkList(listId: string, event: Event): void {
    event.stopPropagation();
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    
    if (isChecked) {
      // Ajouter le consultant à la liste sans afficher de notification
      this.bookmarkService.addConsultantToList(listId, this.consultant.id);
    } else {
      // Retirer le consultant de la liste sans afficher de notification
      this.bookmarkService.removeConsultantFromList(listId, this.consultant.id);
    }
  }
  
  /**
   * Ajoute le consultant actuel à une liste de favoris existante (méthode maintenue pour compatibilité)
   * @param listId ID de la liste de favoris
   * @param event L'événement de clic
   * @deprecated Utiliser toggleBookmarkList à la place
   */
  addToBookmarkList(listId: string, event: MouseEvent): void {
    event.stopPropagation();
    
    // Ajouter sans notification
    this.bookmarkService.addConsultantToList(listId, this.consultant.id);
    
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
    
    // Créer la liste et ajouter le consultant sans notification
    this.bookmarkService.createBookmarkList(this.newListName.trim(), this.consultant.id);
    
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
    // Notification désactivée selon demande
    
    // Efface le timeout précédent s'il existe
    if (this.bookmarkMessageTimeout) {
      clearTimeout(this.bookmarkMessageTimeout);
    }
    
    // Définit un nouveau timeout pour effacer le message
    this.bookmarkMessageTimeout = setTimeout(() => {
      // Pas d'action nécessaire
    }, duration);
  }
  
  /**
   * Calcule la position optimale pour la dropdown des favoris
   * Position modifiée pour toujours afficher la dropdown en dessous du bouton bookmark
   * @param buttonElement L'élément bouton qui a déclenché la dropdown
   */
  calculateBookmarkDropdownPosition(buttonElement: Element): void {
    // Forcer l'affichage en bas (en dessous du bouton bookmark)
    this.bookmarkDropdownPosition = 'bottom';
    
    // Log pour débogage
    console.log("[ConsultantCard] Dropdown bookmark positionnée en dessous du bouton");
  }
  
  /**
   * Trouve le conteneur parent de la carte consultant
   * @param element L'élément à partir duquel chercher
   * @returns L'élément conteneur de la carte ou null
   */
  private findConsultantCardContainer(element: Element): Element | null {
    // Parcourir les parents jusqu'à trouver la carte consultant (max 10 niveaux)
    let currentElement: Element | null = element;
    let depth = 0;
    const maxDepth = 10;
    
    while (currentElement && depth < maxDepth) {
      // Vérifier si c'est une carte consultant (par classe ou attribut)
      if (currentElement.classList.contains('consultant-card') || 
          currentElement.hasAttribute('data-consultant-card')) {
        return currentElement;
      }
      
      // Remonter au parent
      currentElement = currentElement.parentElement;
      depth++;
    }
    
    // Pas trouvé
    return null;
  }
}
