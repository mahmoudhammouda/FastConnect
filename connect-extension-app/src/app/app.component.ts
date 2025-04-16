import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { ModalService } from './services/modal.service';
import { environment } from '../environments/environment';
import { ConsultantService } from './services/consultant.service';
import { ConsultantAvailabilityService } from './services/consultant-availability.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'FastConnect';
  currentUser: User | null = null;
  isAuthenticated = false;
  currentRoute = '';
  menuOpen = false;
  showFilterPanel = false; // Pour gérer l'affichage du panneau de filtres
  isDebugEnabled = true; // Par défaut, le débogage est activé
  showFloatingDebug = false; // Le débogueur flottant est désactivé par défaut
  debugElement: HTMLElement | null = null;
  
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
  debugInfo = {
    baseHref: document.getElementsByTagName('base')[0]?.getAttribute('href') || 'undefined',
    location: window.location.href,
    environment: environment.envName || 'undefined',
    apiUrl: environment.apiUrl || 'undefined',
    routerUrl: '',
    isExtension: environment.isExtension,
    appStartTime: new Date().toISOString()
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    public modalService: ModalService,
    private consultantService: ConsultantService,
    private availabilityService: ConsultantAvailabilityService
  ) {
    console.log('🔍 FastConnect initialisation:', this.debugInfo);
    
    // Vérifier si le débogage est désactivé dans le localStorage
    const savedDebugState = localStorage.getItem('fastconnect-debug-enabled');
    if (savedDebugState !== null) {
      this.isDebugEnabled = savedDebugState === 'true';
    }
    
    const savedFloatingDebugState = localStorage.getItem('fastconnect-floating-debug');
    if (savedFloatingDebugState !== null) {
      this.showFloatingDebug = savedFloatingDebugState === 'true';
    }
    
    // Créer un élément pour le débogage visuel flottant
    setTimeout(() => {
      this.createFloatingDebugElement();
      this.updateFloatingDebugVisibility();
    }, 1000);
  }

  ngOnInit(): void {
    // Observer les changements d'état d'authentification
    this.authService.authState$.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.currentUser = state.user;
    });

    // Observer les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
      this.menuOpen = false; // Fermer le menu à chaque changement de route
    });
    
    // Charger les données pour les filtres
    this.loadFilterOptions();
  }
  
  /**
   * Charge les options disponibles pour les filtres
   */
  loadFilterOptions(): void {
    this.consultantService.getConsultants().subscribe(consultants => {
      // Extraire les localisations disponibles
      const locationsSet = new Set<string>();
      
      // Extraire les compétences disponibles
      const skillsSet = new Set<string>();
      
      consultants.forEach(consultant => {
        // Traitement des localisations
        if (consultant.location) {
          const locations = consultant.location.split(',').map(loc => loc.trim());
          locations.forEach(location => {
            locationsSet.add(location);
          });
        }
        
        // Traitement des compétences
        if (consultant.skills && Array.isArray(consultant.skills)) {
          // Si skills est déjà un tableau, on peut directement itérer dessus
          consultant.skills.forEach((skill: string) => {
            if (skill) skillsSet.add(skill.trim());
          });
        }
      });
      
      this.availableLocations = Array.from(locationsSet).sort();
      this.availableSkills = Array.from(skillsSet).sort();
    });
  }
  
  /**
   * Gère le changement de texte dans la barre de recherche
   */
  onSearchTextChange(): void {
    // On émet un événement pour le composant de liste de consultants
    // qui utilisera cette valeur pour le filtrage
    const searchParams = {
      searchText: this.searchText
    };
    // Passer les paramètres de recherche via localStorage
    localStorage.setItem('fastconnect-search-params', JSON.stringify(searchParams));
    // Émettre un événement custom pour notifier les composants
    window.dispatchEvent(new CustomEvent('fastconnect-search-updated'));
  }
  
  /**
   * Gère l'application des filtres avancés
   */
  applyAdvancedFilters(): void {
    // On stocke les paramètres de filtrage que le composant de liste récupérera
    const filterParams = {
      searchText: this.searchText,
      selectedExperience: this.selectedExperience,
      selectedAvailability: this.selectedAvailability,
      selectedLocation: this.selectedLocation,
      selectedSkills: this.selectedSkills // Ajout des compétences sélectionnées
    };
    localStorage.setItem('fastconnect-filter-params', JSON.stringify(filterParams));
    
    // Émettre un événement custom pour notifier les composants
    window.dispatchEvent(new CustomEvent('fastconnect-filters-updated'));
    
    // Fermer le panneau de filtres
    this.showFilterPanel = false;
  }
  
  /**
   * Réinitialise tous les filtres
   */
  resetAllFilters(): void {
    this.searchText = '';
    this.selectedExperience = 'all';
    this.selectedAvailability = 'all';
    this.selectedLocation = 'all';
    this.selectedSkills = []; // Vider les compétences sélectionnées
    
    // Appliquer les filtres réinitialisés
    this.applyAdvancedFilters();
  }
  
  /**
   * Crée l'élément de débogage flottant
   */
  createFloatingDebugElement(): void {
    // Supprimer l'ancien élément s'il existe
    const existingDebugElement = document.getElementById('floating-debug-info');
    if (existingDebugElement) {
      document.body.removeChild(existingDebugElement);
    }
    
    // Créer un nouvel élément
    this.debugElement = document.createElement('div');
    this.debugElement.id = 'floating-debug-info';
    this.debugElement.style.position = 'fixed';
    this.debugElement.style.bottom = '10px';
    this.debugElement.style.left = '10px';
    this.debugElement.style.padding = '10px';
    this.debugElement.style.background = 'rgba(0,0,0,0.7)';
    this.debugElement.style.color = 'white';
    this.debugElement.style.fontSize = '12px';
    this.debugElement.style.fontFamily = 'monospace';
    this.debugElement.style.zIndex = '9999';
    this.debugElement.style.borderRadius = '5px';
    this.debugElement.style.transition = 'transform 0.3s ease';
    this.debugElement.style.display = this.showFloatingDebug ? 'block' : 'none';
    this.debugElement.innerHTML = `
      <strong>DEBUGGER</strong><br>
      Base: ${this.debugInfo.baseHref}<br>
      URL: ${this.debugInfo.location}<br>
      Env: ${this.debugInfo.environment}<br>
      API: ${this.debugInfo.apiUrl}<br>
      Ext: ${this.debugInfo.isExtension}<br>
      Time: ${this.debugInfo.appStartTime}<br>
    `;
    document.body.appendChild(this.debugElement);
  }
  
  /**
   * Met à jour la visibilité de l'élément de débogage flottant
   */
  updateFloatingDebugVisibility(): void {
    if (!this.debugElement) return;
    
    this.debugElement.style.display = this.showFloatingDebug ? 'block' : 'none';
  }
  
  /**
   * Active ou désactive le mode débogage
   */
  toggleDebugMode(): void {
    this.isDebugEnabled = !this.isDebugEnabled;
    localStorage.setItem('fastconnect-debug-enabled', this.isDebugEnabled.toString());
    
    // Mettre à jour les éléments visuels de débogage
    const headerDebug = document.getElementById('header-debug-bar');
    if (headerDebug) {
      headerDebug.style.display = this.isDebugEnabled ? 'block' : 'none';
    }
  }
  
  /**
   * Active ou désactive le débogueur flottant
   */
  toggleFloatingDebug(): void {
    this.showFloatingDebug = !this.showFloatingDebug;
    localStorage.setItem('fastconnect-floating-debug', this.showFloatingDebug.toString());
    this.updateFloatingDebugVisibility();
  }

  /**
   * Active ou désactive le panneau de filtres
   */
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
        document.addEventListener('click', this.closeMenu);
      }, 0);
    }
  }
  
  /**
   * Fonction pour fermer le menu profil lorsqu'on clique ailleurs
   */
  closeMenu = (event: MouseEvent) => {
    // Vérifier si le clic est dans le menu
    const profileMenu = document.querySelector('.profile-menu');
    
    // Ne pas fermer si on a cliqué dans le menu
    if (profileMenu && profileMenu.contains(event.target as Node)) {
      return;
    }
    
    this.menuOpen = false;
    document.removeEventListener('click', this.closeMenu);
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