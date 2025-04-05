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
  showDetailsDefault: boolean = false; // Contrôle si les détails sont affichés par défaut
  
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
  selectedSortOrder: string = 'relevance'; // Tri par défaut
  
  // Options disponibles pour les filtres
  availableSkills: string[] = [];
  availableLocations: string[] = [];
  
  // Options de tri
  sortOptions = [
    { value: 'relevance', label: 'Pertinence' },
    { value: 'last_updated', label: 'Dernière mise à jour' },
    { value: 'availability', label: 'Disponibilité' }
  ];
  
  // État du dropdown de tri
  sortDropdownOpen: boolean = false;
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
      this.sortDropdownOpen = false;
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
          
          // Initialiser les messages comme étant affichés par défaut
          this.consultants.forEach(consultant => {
            // Initialiser le message principal
            this.expandedMessages[consultant.id] = this.showDetailsDefault;
            // Initialiser le message détaillé
            this.expandedMessages[consultant.id + '-message'] = this.showDetailsDefault;
          });
          
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
          
          // Initialiser les messages comme étant affichés par défaut pour les nouveaux consultants
          newData.forEach(consultant => {
            // Initialiser le message principal
            this.expandedMessages[consultant.id] = this.showDetailsDefault;
            // Initialiser le message détaillé
            this.expandedMessages[consultant.id + '-message'] = this.showDetailsDefault;
          });
          
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
    
    // Appliquer le tri si nécessaire (sauf pour 'relevance' qui est l'ordre par défaut)
    if (this.selectedSortOrder !== 'relevance') {
      this.applySorting();
    }
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
  
  /**
   * Ouvre ou ferme le dropdown de tri
   * @param event Événement de souris
   */
  toggleSortDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.sortDropdownOpen = !this.sortDropdownOpen;
  }
  
  /**
   * Change l'ordre de tri des consultants
   * @param sortOrder Nouvel ordre de tri
   */
  changeSortOrder(sortOrder: string): void {
    if (this.selectedSortOrder === sortOrder) return;
    
    this.selectedSortOrder = sortOrder;
    this.applySorting();
    this.sortDropdownOpen = false;
  }
  
  /**
   * Applique le tri aux consultants filtrés
   */
  applySorting(): void {
    if (!this.filteredConsultants.length) return;
    
    switch (this.selectedSortOrder) {
      case 'relevance':
        // Le tri par pertinence est l'ordre par défaut (aucun tri particulier)
        // On réapplique simplement les filtres pour réinitialiser l'ordre
        this.applyFilters();
        break;
      
      case 'last_updated':
        // Comme nous n'avons pas de champ updatedAt, nous utilisons l'identifiant
        // qui est généralement incrémental et peut servir de proxy pour la date de création/mise à jour
        this.filteredConsultants.sort((a, b) => {
          // Comparer par ID (supposant que les ID plus élevés sont plus récents)
          // Filtrage des caractères non numériques si l'ID contient des lettres
          const idA = parseInt(a.id.replace(/\D/g, ''), 10) || 0;
          const idB = parseInt(b.id.replace(/\D/g, ''), 10) || 0;
          return idB - idA; // Ordre décroissant
        });
        break;
      
      case 'availability':
        // Trier par disponibilité (d'abord les consultants disponibles immédiatement)
        this.filteredConsultants.sort((a, b) => {
          // availability est déjà un nombre selon le modèle
          return a.availability - b.availability;
        });
        break;
    }
  }
  
  @HostListener('document:click')
  closeDropdowns(): void {
    Object.keys(this.dropdownOpen).forEach(id => {
      this.dropdownOpen[id] = false;
    });
    this.sortDropdownOpen = false;
  }
  
  /**
   * Retourne le libellé de l'option de tri actuellement sélectionnée
   * @returns Le libellé de l'option de tri
   */
  getSortLabel(): string {
    const option = this.sortOptions.find(opt => opt.value === this.selectedSortOrder);
    return option ? option.label : 'Pertinence';
  }
  
  /**
   * Vérifie si un consultant a sa carte de message étendue
   * @param id Identifiant du consultant
   * @param suffix Suffixe à ajouter à l'identifiant ('-message' ou '')
   * @returns true si le message est étendu
   */
  isExpanded(id: string, suffix: string): boolean {
    return !!this.expandedMessages[id + suffix];
  }
  
  /**
   * Vérifie si les détails d'un consultant sont étendus
   * @param id Identifiant du consultant
   * @returns true si les détails sont étendus
   */
  isDetailsExpanded(id: string): boolean {
    return !!this.expandedDetails[id];
  }
  
  /**
   * Vérifie si le dropdown d'un consultant est ouvert
   * @param id Identifiant du consultant
   * @returns true si le dropdown est ouvert
   */
  isDropdownOpen(id: string): boolean {
    return !!this.dropdownOpen[id];
  }
  
  /**
   * Gère l'expansion du message d'un consultant
   * @param event Événement émis par le composant
   * @param id Identifiant du consultant
   */
  handleToggleExpansion(event: any, id: string): void {
    if (event.expanded !== undefined) {
      // Mise à jour directe avec la valeur expanded de l'événement
      this.expandedMessages[id + '-message'] = event.expanded;
      console.log(`[ConsultantListComponent] Message expansion set to ${event.expanded} for consultant ${id}`);
    } else if (event && event.stopPropagation) {
      // C'est un événement de clic direct
      event.stopPropagation();
      this.expandedMessages[id + '-message'] = !this.expandedMessages[id + '-message'];
      console.log(`[ConsultantListComponent] Message expansion toggled to ${this.expandedMessages[id + '-message']} for consultant ${id}`);
    }
  }
  
  /**
   * Gère l'expansion du message principal d'un consultant
   * @param event Événement émis par le composant
   * @param id Identifiant du consultant
   */
  handleToggleMessageExpansion(event: any, id: string): void {
    // S'assurer que la propagation de l'événement est arrêtée
    if (event.event && event.event.stopPropagation) {
      event.event.stopPropagation();
    } else if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    
    // Basculer l'état d'expansion du message
    this.expandedMessages[id] = !this.expandedMessages[id];
    console.log(`[ConsultantListComponent] Main message expansion toggled to ${this.expandedMessages[id]} for consultant ${id}`);
  }
  
  /**
   * Gère l'expansion des détails d'un consultant
   * @param event Événement émis par le composant
   * @param id Identifiant du consultant
   */
  handleToggleDetailsExpansion(event: any, id: string): void {
    if (event.event && event.event.stopPropagation) {
      event.event.stopPropagation();
    } else if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    this.expandedDetails[id] = !this.expandedDetails[id];
  }
  
  /**
   * Gère l'ouverture/fermeture du dropdown d'un consultant
   * @param event Événement émis par le composant
   * @param id Identifiant du consultant
   */
  handleToggleDropdown(event: any, id: string): void {
    if (event.event && event.event.stopPropagation) {
      event.event.stopPropagation();
    } else if (event && event.stopPropagation) {
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
}