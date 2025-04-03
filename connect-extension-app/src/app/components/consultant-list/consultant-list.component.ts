import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultantWithTags, ExperienceLevel, AvailabilityStatus } from '../../models/consultant.model';
import { ConsultantCardComponent } from '../consultant-card/consultant-card.component';
import { ConsultantService } from '../../services/consultant.service';

@Component({
  selector: 'app-consultant-list',
  templateUrl: './consultant-list.component.html',
  styleUrls: ['./consultant-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ConsultantCardComponent]
})
export class ConsultantListComponent implements OnInit, OnDestroy {
  @ViewChild('consultantsList', { static: false }) consultantsList?: ElementRef;
  @ViewChild('consultantsListMobile', { static: false }) consultantsListMobile?: ElementRef;
  
  // Données principales
  allConsultants: ConsultantWithTags[] = [];
  consultants: ConsultantWithTags[] = [];
  filteredConsultants: ConsultantWithTags[] = [];
  
  // Paramètre global pour contrôler l'affichage des détails
  showDetailsDefault: boolean = true; // Contrôle si les détails sont affichés par défaut
  
  // Paramètres de pagination
  currentPage: number = 1;
  pageSize: number = 10;
  isLoadingMore: boolean = false;
  hasMoreData: boolean = true;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  
  // Filtres
  searchText: string = '';
  selectedSkills: string[] = [];
  selectedAvailability: string = 'all';
  selectedExperience: string = 'all';
  selectedLocation: string = 'all';
  
  // Options disponibles pour les filtres
  availableSkills: string[] = [];
  availableLocations: string[] = [];
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
  
  // État des UI
  moreFiltersOpen: boolean = false;
  skillsDropdownOpen: boolean = false;
  dropdownOpen: { [id: string]: boolean } = {};
  expandedMessages: { [id: string]: boolean } = {};
  expandedDetails: { [id: string]: boolean } = {}; // Pour contrôler l'affichage des détails
  configDropdownOpen: boolean = false;
  
  documentClickListener?: any;
  
  // Événements de sortie - nous n'en avons plus besoin car le composant est autonome
  
  constructor(private consultantService: ConsultantService) { }

  ngOnInit(): void {
    // Charger les données initiales
    this.loadInitialConsultants();
    
    // Charger tous les consultants pour extraire les filtres (en parallèle)
    this.loadAllConsultantsForFiltering();
    
    // Ajouter un écouteur de clic global pour fermer les dropdowns
    this.documentClickListener = () => {
      Object.keys(this.dropdownOpen).forEach(key => {
        this.dropdownOpen[key] = false;
      });
      this.skillsDropdownOpen = false;
      this.configDropdownOpen = false;
    };
    document.addEventListener('click', this.documentClickListener);
    
    // Appliquer la valeur du paramètre global showDetailsDefault
    setTimeout(() => {
      this.consultantService.getConsultants().subscribe(consultants => {
        consultants.forEach(consultant => {
          this.expandedMessages[consultant.id] = this.showDetailsDefault;
        });
      });
    }, 500);
    
    // Écouter les événements de recherche et filtrage provenant de l'UI LinkedIn-style
    window.addEventListener('fastconnect-search-updated', this.handleSearchUpdate.bind(this));
    window.addEventListener('fastconnect-filters-updated', this.handleFiltersUpdate.bind(this));
  }
  
  /**
   * Gère les mises à jour de recherche provenant de la barre de recherche principale
   */
  handleSearchUpdate(): void {
    try {
      const searchParamsStr = localStorage.getItem('fastconnect-search-params');
      if (searchParamsStr) {
        const searchParams = JSON.parse(searchParamsStr);
        this.searchText = searchParams.searchText || '';
        
        // Appliquer les filtres avec la nouvelle valeur de recherche
        this.applyFilters();
      }
    } catch (error) {
      console.error('Erreur lors de la gestion des paramètres de recherche:', error);
    }
  }
  
  /**
   * Gère les mises à jour des filtres avancés
   */
  handleFiltersUpdate(): void {
    try {
      const filterParamsStr = localStorage.getItem('fastconnect-filter-params');
      if (filterParamsStr) {
        const filterParams = JSON.parse(filterParamsStr);
        this.searchText = filterParams.searchText || '';
        this.selectedExperience = filterParams.selectedExperience || 'all';
        this.selectedAvailability = filterParams.selectedAvailability || 'all';
        this.selectedLocation = filterParams.selectedLocation || 'all';
        this.selectedSkills = filterParams.selectedSkills || []; // Récupérer les compétences sélectionnées
        
        // Appliquer les filtres avec les nouvelles valeurs
        this.applyFilters();
      }
    } catch (error) {
      console.error('Erreur lors de la gestion des paramètres de filtrage:', error);
    }
  }
  
  ngOnDestroy(): void {
    // Nettoyage des écouteurs d'événements
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
    }
    
    // Supprimer les écouteurs d'événements personnalisés
    window.removeEventListener('fastconnect-search-updated', this.handleSearchUpdate.bind(this));
    window.removeEventListener('fastconnect-filters-updated', this.handleFiltersUpdate.bind(this));
  }
  
  /**
   * Écouteur d'événement de défilement pour l'infinite scroll
   * Cette méthode est appelée via (scroll) sur le conteneur défilant
   */
  onScroll(event: Event): void {
    let element: HTMLElement | null = null;
    
    // Déterminer quel conteneur est actif selon la taille d'écran
    if (this.consultantsList && window.innerWidth >= 768) {
      element = this.consultantsList.nativeElement;
    } else if (this.consultantsListMobile && window.innerWidth < 768) {
      element = this.consultantsListMobile.nativeElement;
    }
    
    if (!element) return;
    
    const scrollPosition = element.scrollTop + element.clientHeight;
    
    // Si nous avons atteint le bas du conteneur (avec une marge de 100px)
    // et que nous ne sommes pas déjà en train de charger plus de données
    // et qu'il y a potentiellement plus de données à charger
    if (scrollPosition >= (element.scrollHeight - 100) && !this.isLoadingMore && this.hasMoreData) {
      this.loadMoreConsultants();
    }
  }

  /**
   * Charge les premières données des consultants
   */
  loadInitialConsultants(): void {
    console.log('[ConsultantListComponent] Démarrage du chargement des consultants initiaux');
    this.isLoading = true;
    this.errorMessage = null;
    this.currentPage = 1;
    
    this.consultantService.getPagedConsultants(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          console.log(`[ConsultantListComponent] Consultants initiaux reçus: ${data.length} consultants`);
          this.consultants = data;
          console.log('[ConsultantListComponent] Application des filtres');
          this.applyFilters();
          console.log(`[ConsultantListComponent] Après filtrage: ${this.filteredConsultants.length} consultants affichés`);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('[ConsultantListComponent] Erreur lors du chargement des consultants:', error);
          this.errorMessage = 'erreur_chargement';
          this.isLoading = false;
        }
      });
  }

  /**
   * Charge plus de consultants lorsque l'utilisateur fait défiler la page
   */
  loadMoreConsultants(): void {
    if (this.isLoadingMore || !this.hasMoreData) return;
    
    this.isLoadingMore = true;
    console.log("Démarrage du chargement de la page suivante");
    
    this.currentPage++;
    console.log(`Chargement de la page ${this.currentPage} avec ${this.pageSize} éléments par page`);
    
    this.consultantService.getPagedConsultants(this.currentPage, this.pageSize)
      .subscribe(
        newData => {
          console.log(`Reçu ${newData.length} consultants de plus`);
          
          if (newData.length === 0) {
            this.hasMoreData = false;
            this.isLoadingMore = false;
            console.log("hasMoreData défini à false");
            return;
          }
          
          // Ajouter les nouvelles données aux consultants existants
          this.consultants = [...this.consultants, ...newData];
          
          // Filtrer les nouvelles données en fonction des filtres actuels
          this.applyFilters();
          
          this.isLoadingMore = false;
          
          // Vérifier s'il y a plus de données à charger
          this.hasMoreData = newData.length >= this.pageSize;
          console.log(`hasMoreData défini à ${this.hasMoreData}`);
        },
        error => {
          console.error('Error fetching more consultants:', error);
          this.isLoadingMore = false;
          this.errorMessage = 'erreur_chargement';
        }
      );
  }

  /**
   * Charge tous les consultants pour pouvoir extraire toutes les compétences disponibles pour le filtrage
   */
  loadAllConsultantsForFiltering(): void {
    this.consultantService.getConsultants()
      .subscribe(
        data => {
          this.allConsultants = data;
          this.extractAvailableSkills();
          this.extractAvailableLocations();
        },
        error => {
          console.error('Error fetching all consultants for filtering:', error);
        }
      );
  }

  /**
   * Extract unique skills from all consultants for filtering
   */
  extractAvailableSkills(): void {
    const skillsSet = new Set<string>();
    
    this.allConsultants.forEach(consultant => {
      consultant.skills.forEach(skill => {
        skillsSet.add(skill);
      });
    });
    
    this.availableSkills = Array.from(skillsSet).sort();
  }

  /**
   * Extract unique locations from all consultants for filtering
   */
  extractAvailableLocations(): void {
    const locationsSet = new Set<string>();
    
    this.allConsultants.forEach(consultant => {
      if (consultant.location) {
        // Split locations if they are comma-separated
        const locations = consultant.location.split(',').map(loc => loc.trim());
        locations.forEach(location => {
          locationsSet.add(location);
        });
      }
    });
    
    this.availableLocations = Array.from(locationsSet).sort();
  }

  /**
   * Filter consultants based on current search/filter parameters
   */
  applyFilters(): void {
    if (!this.consultants.length) {
      this.filteredConsultants = [];
      return;
    }
    
    this.filteredConsultants = this.consultantService.filterConsultants(
      this.consultants,
      this.searchText,
      this.selectedSkills,
      this.selectedAvailability,
      this.selectedExperience,
      this.selectedLocation
    );
    
    console.log(`Après filtrage, taille totale de la liste: ${this.filteredConsultants.length}`);
  }
  
  // Méthodes pour les filtres
  onSearchChange(): void {
    this.applyFilters();
  }
  
  onExperienceChange(): void {
    this.applyFilters();
  }
  
  onAvailabilityChange(): void {
    this.applyFilters();
  }
  
  onLocationChange(): void {
    this.applyFilters();
  }
  
  toggleSkillFilter(skill: string): void {
    const index = this.selectedSkills.indexOf(skill);
    if (index === -1) {
      // Si la compétence n'est pas dans la liste, l'ajouter
      this.selectedSkills.push(skill);
    } else {
      // Si la compétence est déjà dans la liste, la retirer
      this.selectedSkills.splice(index, 1);
    }
    this.applyFilters();
  }
  
  onToggleMoreFilters(event: MouseEvent): void {
    event.stopPropagation();
    this.moreFiltersOpen = !this.moreFiltersOpen;
  }
  
  onToggleSkillsDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.skillsDropdownOpen = !this.skillsDropdownOpen;
  }
  
  // Méthodes d'action sur les consultants
  openLinkedIn(url: string): void {
    // Si nous sommes dans une extension Chrome, utiliser l'API chrome.tabs
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url });
    } else {
      // Sinon, ouvrir dans un nouvel onglet
      window.open(url, '_blank');
    }
  }
  
  showPhone(phone: string | null): void {
    if (phone) {
      // Pour un numéro de téléphone, nous pourrions ouvrir un lien tel: ou afficher une alerte
      alert(`Téléphone: ${phone}`);
    } else {
      alert('Numéro de téléphone non disponible');
    }
  }
  
  sendEmail(email: string | null): void {
    if (email) {
      // Ouvrir le client de messagerie par défaut
      window.location.href = `mailto:${email}`;
    } else {
      alert('Adresse email non disponible');
    }
  }
  
  // Méthodes pour les dropdowns et expansions
  toggleDropdown(id: string, event: any): void {
    if (event.event && event.event.stopPropagation) {
      // Si c'est un objet avec un event de notre composant
      event.event.stopPropagation();
    } else if (event && event.stopPropagation) {
      // Si c'est un MouseEvent
      event.stopPropagation();
    }
    
    // Fermer tous les autres dropdowns
    Object.keys(this.dropdownOpen).forEach(key => {
      if (key !== id) {
        this.dropdownOpen[key] = false;
      }
    });
    
    // Basculer l'état du dropdown actuel
    this.dropdownOpen[id] = !this.dropdownOpen[id];
  }
  
  toggleMessageExpansion(id: string, event: any): void {
    if (event.event && event.event.stopPropagation) {
      // Si c'est un objet avec un event de notre composant
      event.event.stopPropagation();
    } else if (event && event.stopPropagation) {
      // Si c'est un MouseEvent
      event.stopPropagation();
    }
    this.expandedMessages[id] = !this.expandedMessages[id];
    console.log("Message expansion toggled for ID:", id, "New state:", this.expandedMessages[id]);
  }
  
  toggleExpandMessage(id: string, event: any): void {
    if (event.expanded !== undefined) {
      // Si c'est un objet avec expanded, c'est un événement de notre composant
      this.expandedMessages[id + '-message'] = event.expanded;
    } else if (event && event.stopPropagation) {
      // Si c'est un MouseEvent
      event.stopPropagation();
      this.expandedMessages[id + '-message'] = !this.expandedMessages[id + '-message'];
    }
  }
  
  toggleDetailsExpansion(id: string, event: any): void {
    if (event.event && event.event.stopPropagation) {
      // Si c'est un objet avec un event de notre composant
      event.event.stopPropagation();
    } else if (event && event.stopPropagation) {
      // Si c'est un MouseEvent
      event.stopPropagation();
    }
    this.expandedDetails[id] = !this.expandedDetails[id];
    console.log("Details expansion toggled for ID:", id, "New state:", this.expandedDetails[id]);
  }
  
  // Méthodes utilitaires
  formatMessage(message: string): string {
    return message.replace(/#(\w+)/g, '<span class="text-blue-600 text-xs font-medium hover:text-blue-800 transition-colors duration-300">#$1</span>');
  }
  
  isMessageLong(message: string): boolean {
    return message.length > 150;
  }
  
  getSeniorityBars(experience: ExperienceLevel): number {
    if (experience === 'less_than_3') return 1;
    if (experience === 'between_3_and_10') return 2;
    return 3;
  }
  
  @HostListener('document:click')
  closeDropdowns(): void {
    Object.keys(this.dropdownOpen).forEach(id => {
      this.dropdownOpen[id] = false;
    });
  }
}