import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { ModalService } from './services/modal.service';
import { environment } from '../environments/environment';
import { ConsultantService } from './services/consultant.service';
import { ConsultantAvailabilityService } from './services/consultant-availability.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FcAppComponent } from './components/fc-app/fc-app.component';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FastConnect';
  currentUser: User | null = null;
  isAuthenticated = false;
  currentRoute = '';
  activeTab: string = 'consultants'; // Par défaut, l'onglet "Consultants" est actif
  menuOpen = false;
  showFilterPanel = false; // Pour gérer l'affichage du panneau de filtres
  isDebugEnabled = true; // Par défaut, le débogage est activé
  showFloatingDebug = false; // Le débogueur flottant est désactivé par défaut
  debugElement: HTMLElement | null = null;
  
  // Référence à l'écouteur d'événement de redimensionnement
  private resizeListener: (() => void) | null = null;
  
  // Taille d'écran pour déterminer si on est en mobile ou desktop
  private mobileBreakpoint = 768;
  private columnBreakpoint = 1224; // Breakpoint quand la colonne gauche disparaît
  
  // Variables pour les filtres dans le style LinkedIn
  searchText: string = '';
  selectedExperience: string = 'all';
  selectedAvailability: string = 'all';
  selectedLocation: string = 'all';
  selectedSkills: string[] = []; // Pour stocker les compétences sélectionnées
  availableLocations: string[] = [];
  availableSkills: string[] = []; // Pour stocker les compétences disponibles
  
  // Information de débogage
  debugInfo = {
    environment: '',
    baseHref: '',
    location: '',
    apiUrl: '',
    routerUrl: '',
    isExtension: false,
    appStartTime: '',
    userAgent: '',
    loggedInUser: ''
  };
  
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

  // Propriété pour stocker le mode compact actuel
  private _compactMode: boolean = false;
  
  // Méthode pour détecter si on doit activer le mode compact
  isCompactMode(): boolean {
    return this._compactMode;
  }
  
  // Méthode pour mettre à jour l'état du mode compact
  private updateCompactMode(): void {
    this._compactMode = window.innerWidth < this.columnBreakpoint || this.debugInfo.isExtension;
  }

  // Propriétés pour la landing page modernisée
  userProfile: 'consultant' | 'recruiter' = 'consultant';
  showActionDropdown = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    public modalService: ModalService,
    private consultantService: ConsultantService,
    private availabilityService: ConsultantAvailabilityService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log('🔍 FastConnect initialisation:', this.debugInfo);
    
    // S'abonner aux événements de navigation pour suivre la route actuelle
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
    
    // Vérifier si le mode débogage est activé
    const savedDebugState = localStorage.getItem('fastconnect-debug-enabled');
    if (savedDebugState !== null) {
      this.isDebugEnabled = savedDebugState === 'true';
    }
    
    const savedFloatingDebugState = localStorage.getItem('fastconnect-floating-debug');
    if (savedFloatingDebugState !== null) {
      this.showFloatingDebug = savedFloatingDebugState === 'true';
    }
    
    // Initialiser le profil utilisateur basé sur le localStorage s'il existe
    const savedProfile = localStorage.getItem('fc-user-profile');
    if (savedProfile === 'consultant' || savedProfile === 'recruiter') {
      this.userProfile = savedProfile;
    }
  }

  ngOnInit(): void {
    // Initialisation des informations de débogage
    this.debugInfo = {
      environment: environment.production ? 'Production' : 'Développement',
      baseHref: document.querySelector('base')?.getAttribute('href') || '/',
      location: window.location.href,
      apiUrl: environment.apiUrl,
      routerUrl: '',
      isExtension: environment.isExtension,
      appStartTime: new Date().toLocaleTimeString(),
      userAgent: window.navigator.userAgent,
      loggedInUser: ''
    };
    
    // Initialiser le mode compact au démarrage
    this.updateCompactMode();
    
    // Ajouter un écouteur d'événement pour les changements de taille de fenêtre
    this.resizeListener = () => this.updateCompactMode();
    window.addEventListener('resize', this.resizeListener);

    // Attendre que le DOM soit chargé puis positionner le système orbital
    setTimeout(() => {
      this.positionOrbitalSystem();
      // Ajouter un écouteur d'événement pour le redimensionnement de la fenêtre
      window.addEventListener('resize', () => {
        this.positionOrbitalSystem();
      });
    }, 500);
    
    // Observer les changements d'état d'authentification
    this.authService.authState$.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.currentUser = state.user;
    });
    
    // Pour le débogage, vérifier l'état d'authentification actuel
    // La méthode checkAuthState n'existe pas dans AuthService
    // this.authService.checkAuthState();
    
    // Récupérer les paramètres de recherche enregistrés
    const savedSearchParams = localStorage.getItem('fastconnect-search-params');
    if (savedSearchParams) {
      const params = JSON.parse(savedSearchParams);
      this.searchText = params.searchText || '';
    }
  }
  
  ngOnDestroy(): void {
    // Nettoyage de l'écouteur d'événement de redimensionnement
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      this.resizeListener = null;
    }
    // Supprimer l'écouteur d'événement pour éviter les fuites de mémoire
    window.removeEventListener('resize', () => this.positionOrbitalSystem());
  }
  
  /**
   * Gère le changement d'onglet dans la navbar
   * @param tab Le nouvel onglet actif
   */
  onTabChange(tab: string) {
    this.activeTab = tab;
  }
  
  /**
   * Active ou désactive le mode débogage
   */
  toggleDebugMode(): void {
    this.isDebugEnabled = !this.isDebugEnabled;
    localStorage.setItem('fastconnect-debug-enabled', this.isDebugEnabled.toString());
  }
  
  /**
   * Active ou désactive le débogueur flottant
   */
  toggleFloatingDebug(): void {
    this.showFloatingDebug = !this.showFloatingDebug;
    localStorage.setItem('fastconnect-floating-debug', this.showFloatingDebug.toString());
  }
  
  /**
   * Gère l'action principale basée sur le profil utilisateur
   * @param profileOverride - Profil utilisateur à utiliser (optionnel)
   */
  handleMainAction(profileOverride?: 'consultant' | 'recruiter'): void {
    // Si un profil est spécifié, on l'utilise temporairement pour cette action
    const profile = profileOverride || this.userProfile;
    
    if (profile === 'consultant') {
      // Logique pour publier une disponibilité
      console.log('Action: Publier disponibilité');
      this.modalService.openLoginModal();
    } else {
      // Logique pour publier une mission
      console.log('Action: Publier mission');
      this.modalService.openLoginModal();
    }
    
    // Fermer le dropdown après l'action
    this.showActionDropdown = false;
  }
  
  /**
   * Bascule entre le profil consultant et recruteur
   * Met à jour le bouton d'action principal
   */
  toggleUserAction(): void {
    // Basculer entre consultant et recruteur
    this.userProfile = this.userProfile === 'consultant' ? 'recruiter' : 'consultant';
    
    // Sauvegarder la préférence
    localStorage.setItem('fc-user-profile', this.userProfile);
    
    // Animation de transition (optionnel)
    const actionButton = document.querySelector('.fc-action-cta button:first-child');
    if (actionButton) {
      actionButton.classList.add('scale-105');
      setTimeout(() => {
        actionButton.classList.remove('scale-105');
      }, 300);
    }
  }
  
  // La méthode selectAction n'est plus nécessaire car nous utilisons toggleUserAction
  
  /**
   * Positionne le système orbital au coin supérieur gauche du composant fc-app-container
   */
  positionOrbitalSystem(): void {
    // Récupérer les éléments du DOM
    const appContainer = document.querySelector('.fc-app-container');
    const orbitalSystem = document.getElementById('orbital-system');
    
    if (appContainer && orbitalSystem) {
      // Récupérer la position du coin supérieur gauche du fc-app-container
      const rect = appContainer.getBoundingClientRect();
      
      // Calculer la position par rapport à la page
      const topPosition = rect.top - 30; // Légèrement au-dessus du coin
      const leftPosition = rect.left - 30; // Légèrement à gauche du coin
      
      // Appliquer la position au système orbital
      orbitalSystem.style.position = 'fixed';
      orbitalSystem.style.top = `${topPosition}px`;
      orbitalSystem.style.left = `${leftPosition}px`;
    }
  }
  
  toggleFilterPanel(): void {
    this.showFilterPanel = !this.showFilterPanel;
  }

  toggleMenu(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.menuOpen = !this.menuOpen;
    
    // Ajouter un écouteur d'événement au document pour fermer le menu quand on clique ailleurs
    if (this.menuOpen) {
      setTimeout(() => {
        window.document.addEventListener('click', this.closeMenu);
      }, 0);
    }
  }
  
  /**
   * Fonction pour fermer le menu profil lorsqu'on clique ailleurs
   */
  closeMenu = (event: MouseEvent) => {
    // Vérifier si le clic est dans le menu
    const profileMenu = window.document.querySelector('.profile-menu');
    
    // Ne pas fermer si on a cliqué dans le menu
    if (profileMenu && profileMenu.contains(event.target as Node)) {
      return;
    }
    
    this.menuOpen = false;
    window.document.removeEventListener('click', this.closeMenu);
  }

  openLoginModal(): void {
    this.modalService.openLoginModal();
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
   * Ouvre le formulaire d'ajout de disponibilité
   * Cette méthode sera modifiée dans une future étape
   */
  openAddAvailabilityForm(): void {
    console.log('Cette fonctionnalité sera implémentée différemment dans une prochaine étape');
    
    // Pour l'instant, nous redirigeons vers la page des disponibilités
    this.router.navigate(['/availabilities']);
    
    // L'ancien code est commenté mais conservé pour référence
    // this.availabilityService.initNewForm();
    // this.modalService.open('add-availability-modal');
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
        window.document.addEventListener('click', this.closeSkillsDropdowns);
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
        window.document.addEventListener('click', this.closeSkillsDropdowns);
      }, 0);
    }
  }

  /**
   * Fonction pour fermer les dropdowns lorsqu'on clique ailleurs
   */
  closeSkillsDropdowns = (event: MouseEvent) => {
    // Vérifier si le clic est dans un des dropdowns
    const desktopDropdown = window.document.querySelector('.skill-dropdown-desktop');
    const mobileDropdown = window.document.querySelector('.skill-dropdown-mobile');
    
    // Ne pas fermer si on a cliqué dans le dropdown
    if ((desktopDropdown && desktopDropdown.contains(event.target as Node)) || 
        (mobileDropdown && mobileDropdown.contains(event.target as Node))) {
      return;
    }
    
    this.skillsDropdownOpen = false;
    this.mobileSkillsDropdownOpen = false;
    window.document.removeEventListener('click', this.closeSkillsDropdowns);
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