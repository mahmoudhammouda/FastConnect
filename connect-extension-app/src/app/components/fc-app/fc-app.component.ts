import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { ModalService } from '../../services/modal.service';
import { environment } from '../../../environments/environment';
import { ConsultantService } from '../../services/consultant.service';
import { ConsultantAvailabilityService } from '../../services/consultant-availability.service';
import { BookmarkService } from '../../services/bookmark.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-fc-app',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './fc-app.component.html',
  styleUrl: './fc-app.component.css'
})
export class FcAppComponent implements OnInit, OnChanges {
  /**
   * Définit le contexte dans lequel le composant est utilisé
   * Valeurs possibles : 'landing-page', 'extension', 'standalone', 'embedded'
   */
  @Input() context: 'landing-page' | 'extension' | 'standalone' | 'embedded' = 'standalone';
  
  /**
   * Définit si le composant doit utiliser des marges réduites
   */
  @Input() compactMode = false;
  
  title = 'FastConnect';
  currentUser: User | null = null;
  isAuthenticated = false;
  currentRoute = '';
  activeTab: string = 'consultants'; // Par défaut, l'onglet "Consultants" est actif
  menuOpen = false;
  showFilterPanel = false; // Pour gérer l'affichage du panneau de filtres
  
  // Taille d'écran pour déterminer si on est en mobile ou desktop
  private mobileBreakpoint = 768;
  
  // Variables pour les filtres dans le style LinkedIn
  searchText: string = '';
  selectedExperience: string = 'all';
  selectedAvailability: string = 'all';
  selectedLocation: string = 'all';
  selectedSkills: string[] = []; // Pour stocker les compétences sélectionnées
  availableLocations: string[] = [];
  availableSkills: string[] = []; // Pour stocker les compétences disponibles
  
  // États pour les dropdowns de compétences
  skillsDropdownOpen = false;
  mobileSkillsDropdownOpen = false;
  experienceOptions = [
    { value: 'less_than_3', label: 'Moins de 3 ans' },
    { value: 'between_3_and_10', label: 'Entre 3 et 10 ans' },
    { value: 'more_than_10', label: 'Plus de 10 ans' }
  ];
  availabilityOptions = [
    { value: '0', label: 'Disponible maintenant' },
    { value: '1', label: 'Disponible prochainement' },
    { value: '2', label: 'Non disponible' }
  ];

  // Propriétés pour le modal de bookmarks
  isBookmarkModalVisible: boolean = false;
  bookmarkLists: any[] = [];
  newBookmarkListName: string = '';
  currentConsultantId: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    public modalService: ModalService,
    private consultantService: ConsultantService,
    private availabilityService: ConsultantAvailabilityService,
    private bookmarkService: BookmarkService
  ) {}

  /**
   * Gère le changement d'onglet dans la navbar
   * @param tab Le nouvel onglet actif
   */
  onTabChange(tab: string) {
    this.activeTab = tab;
  }

  ngOnInit(): void {
    // Observer les changements d'état d'authentification
    this.authService.authState$.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.currentUser = state.user;
    });

    // Écouter l'événement d'ouverture du modal bookmark
    window.addEventListener('fastconnect-open-bookmark-modal', ((event: CustomEvent) => {
      const { consultantId } = event.detail;
      if (consultantId) {
        this.openBookmarkModal(consultantId);
      }
    }) as EventListener);

    // Charger les options de filtres
    this.loadFilterOptions();
    
    // Appliquer les styles spécifiques au contexte
    this.applyContextStyles();
    
    console.log(`FC-App component initialized in ${this.context} context with compactMode=${this.compactMode}`);
  }

  /**
   * Détecte les changements des propriétés d'entrée
   * @param changes Les changements détectés
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Vérifier si la propriété compactMode a changé
    if (changes['compactMode']) {
      // Appliquer les styles immédiatement quand compactMode change
      setTimeout(() => this.applyContextStyles(), 0);
      console.log('Mode compact changé :', this.compactMode);
    }
  }

  /**
   * Charge les options disponibles pour les filtres
   */
  loadFilterOptions(): void {
    // Récupérer les localisations disponibles
    this.consultantService.getAvailableLocations().subscribe((locations: string[]) => {
      this.availableLocations = locations;
    });
    
    // Récupérer les compétences disponibles
    this.consultantService.getAvailableSkills().subscribe((skills: string[]) => {
      this.availableSkills = skills;
    });
  }

  /**
   * Gère le changement de texte dans la barre de recherche
   */
  onSearchTextChange(): void {
    // Après un délai pour éviter trop de requêtes
    // Rechercher avec le texte actuel
    this.applyAdvancedFilters();
  }

  /**
   * Gère l'application des filtres avancés
   */
  applyAdvancedFilters(): void {
    const filters = {
      searchText: this.searchText,
      experience: this.selectedExperience,
      availability: this.selectedAvailability,
      location: this.selectedLocation,
      skills: this.selectedSkills
    };
    
    // Émettre un événement avec les filtres sélectionnés
    this.consultantService.updateFilters(filters);
    
    // Fermer le panneau de filtres en mode mobile
    if (this.isMobileView()) {
      this.showFilterPanel = false;
    }
  }

  /**
   * Réinitialise tous les filtres
   */
  resetAllFilters(): void {
    this.searchText = '';
    this.selectedExperience = 'all';
    this.selectedAvailability = 'all';
    this.selectedLocation = 'all';
    this.selectedSkills = [];
    
    // Appliquer les filtres réinitialisés
    this.applyAdvancedFilters();
  }

  /**
   * Active ou désactive le panneau de filtres
   */
  toggleFilterPanel(): void {
    this.showFilterPanel = !this.showFilterPanel;
  }

  // Note: Les méthodes de gestion des filtres existent déjà plus bas dans la classe

  toggleMenu(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.menuOpen = !this.menuOpen;
    
    // Si le menu est ouvert, ajouter un écouteur pour le fermer quand on clique ailleurs
    if (this.menuOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.handleDocumentClick);
      }, 0);
    } else {
      document.removeEventListener('click', this.handleDocumentClick);
    }
  }

  handleDocumentClick = () => {
    this.menuOpen = false;
    document.removeEventListener('click', this.handleDocumentClick);
  }

  openLoginModal(): void {
    this.modalService.openLoginModal();
  }
  
  /**
   * Ouvre le modal des bookmarks pour un consultant spécifique
   * @param consultantId ID du consultant à ajouter aux favoris
   */
  openBookmarkModal(consultantId: string): void {
    this.currentConsultantId = consultantId;
    this.bookmarkLists = this.bookmarkService.getBookmarkLists();
    this.newBookmarkListName = '';
    this.isBookmarkModalVisible = true;
  }
  
  /**
   * Ferme le modal des bookmarks
   */
  closeBookmarkModal(): void {
    this.isBookmarkModalVisible = false;
    this.currentConsultantId = null;
  }
  
  /**
   * Vérifie si le consultant actuel est dans une liste spécifique
   * @param listId ID de la liste à vérifier
   * @returns true si le consultant est dans la liste
   */
  isConsultantInList(listId: string): boolean {
    if (!this.currentConsultantId) return false;
    const list = this.bookmarkLists.find(l => l.id === listId);
    return list ? list.consultantIds.includes(this.currentConsultantId) : false;
  }
  
  /**
   * Ajoute ou retire le consultant actuel d'une liste
   * @param listId ID de la liste
   * @param event Événement du changement de case à cocher
   */
  toggleBookmarkInList(listId: string, event: Event): void {
    if (!this.currentConsultantId) return;
    
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.bookmarkService.addConsultantToList(listId, this.currentConsultantId);
    } else {
      this.bookmarkService.removeConsultantFromList(listId, this.currentConsultantId);
    }
    
    // Mettre à jour la liste des favoris
    this.bookmarkLists = this.bookmarkService.getBookmarkLists();
  }
  
  /**
   * Crée une nouvelle liste de favoris et y ajoute le consultant actuel
   */
  createNewBookmarkList(): void {
    if (!this.newBookmarkListName.trim() || !this.currentConsultantId) return;
    
    this.bookmarkService.createBookmarkList(
      this.newBookmarkListName.trim(), 
      this.currentConsultantId
    );
    
    // Réinitialiser le champ et mettre à jour la liste
    this.newBookmarkListName = '';
    this.bookmarkLists = this.bookmarkService.getBookmarkLists();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Au lieu de rediriger, on reste sur la même page
        this.menuOpen = false;
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
        this.menuOpen = false;
      }
    });
  }
  
  /**
   * Retourne l'initiale du prénom ou du nom d'utilisateur pour l'affichage mobile
   * @returns Une lettre initiale ou 'U' par défaut
   */
  getInitials(): string {
    if (this.currentUser) {
      if (this.currentUser.firstName) {
        return this.currentUser.firstName.charAt(0);
      }
      if (this.currentUser.username) {
        return this.currentUser.username.charAt(0);
      }
    }
    return 'U';
  }
  
  /**
   * Détermine si l'affichage est en mode mobile
   * @returns true si la largeur d'écran est inférieure au point de rupture mobile
   */
  isMobileView(): boolean {
    return window.innerWidth < this.mobileBreakpoint;
  }
  
  /**
   * Applique les styles spécifiques au contexte d'intégration
   */
  private applyContextStyles(): void {
    const container = document.querySelector('.fc-app-content-wrapper') as HTMLElement;
    if (!container) return;
    
    // Réinitialiser les styles
    container.style.padding = '';
    container.style.margin = '';
    container.style.maxHeight = '';
    
    // Appliquer les styles selon le contexte
    switch (this.context) {
      case 'landing-page':
        // Styles pour l'intégration dans une landing page
        container.style.margin = '0';
        container.style.padding = this.compactMode ? '0rem' : '1rem';
        break;
        
      case 'extension':
        // Styles pour l'intégration dans l'extension Chrome
        container.style.margin = '0';
        container.style.padding = '0.5rem';
        container.style.maxHeight = '600px';
        container.style.overflowY = 'auto';
        break;
        
      case 'embedded':
        // Styles pour l'intégration dans un iframe
        container.style.margin = '0';
        container.style.padding = '0.25rem';
        container.style.maxHeight = '100%';
        container.style.overflowY = 'auto';
        break;
        
      case 'standalone':
      default:
        // Style par défaut pour une utilisation autonome
        container.style.margin = '1rem auto';
        container.style.padding = '1.5rem';
        break;
    }
  }
  
  /**
   * Ouvre le formulaire d'ajout de disponibilité
   */
  openAddAvailabilityForm(): void {
    console.log('Cette fonctionnalité sera implémentée différemment dans une prochaine étape');
    
    // Pour l'instant, nous redirigeons vers la page des disponibilités
    this.router.navigate(['/availabilities']);
  }

  /**
   * Ouvre/ferme le dropdown de compétences en mode desktop
   */
  toggleSkillsDropdown(event: Event): void {
    event.stopPropagation();
    this.skillsDropdownOpen = !this.skillsDropdownOpen;
    this.mobileSkillsDropdownOpen = false; // Ferme le dropdown mobile si ouvert
    
    // Ajouter un écouteur d'événement au document pour fermer le dropdown quand on clique ailleurs
    if (this.skillsDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeSkillsDropdowns);
      }, 0);
    }
  }

  /**
   * Ouvre/ferme le dropdown de compétences en mode mobile
   */
  toggleMobileSkillsDropdown(event: Event): void {
    event.stopPropagation();
    this.mobileSkillsDropdownOpen = !this.mobileSkillsDropdownOpen;
    this.skillsDropdownOpen = false; // Ferme le dropdown desktop si ouvert
    
    // Ajouter un écouteur d'événement au document pour fermer le dropdown quand on clique ailleurs
    if (this.mobileSkillsDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeSkillsDropdowns);
      }, 0);
    }
  }

  /**
   * Fonction pour fermer les dropdowns lorsqu'on clique ailleurs
   */
  closeSkillsDropdowns = (event: MouseEvent) => {
    // Vérifier si le clic est dans un des dropdowns
    const desktopDropdown = document.querySelector('.skill-dropdown-desktop');
    const mobileDropdown = document.querySelector('.skill-dropdown-mobile');
    
    // Ne pas fermer si on a cliqué dans le dropdown
    if ((desktopDropdown && desktopDropdown.contains(event.target as Node)) || 
        (mobileDropdown && mobileDropdown.contains(event.target as Node))) {
      return;
    }
    
    this.skillsDropdownOpen = false;
    this.mobileSkillsDropdownOpen = false;
    document.removeEventListener('click', this.closeSkillsDropdowns);
  }

  /**
   * Vérifie si une compétence est déjà sélectionnée
   */
  isSkillSelected(skill: string): boolean {
    return this.selectedSkills.includes(skill);
  }

  /**
   * Ajoute ou retire une compétence de la sélection
   */
  toggleSkill(skill: string): void {
    const index = this.selectedSkills.indexOf(skill);
    if (index === -1) {
      // Ajouter la compétence si elle n'est pas déjà sélectionnée
      this.selectedSkills.push(skill);
    } else {
      // Retirer la compétence si elle est déjà sélectionnée
      this.selectedSkills.splice(index, 1);
    }
  }
}
