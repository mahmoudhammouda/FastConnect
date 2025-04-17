import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { Alert, AlertCriteria } from '../../models/alert.model';

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements OnInit, OnDestroy {
  // Liste des alertes
  alerts: Alert[] = [];
  
  // ID de l'alerte sélectionnée
  selectedAlertId: string | null = null;
  
  // État du mode édition pour les noms d'alerte
  editingAlertId: string | null = null;
  newAlertName: string = '';
  
  // Gestion de la création d'une nouvelle alerte
  isCreatingNewAlert: boolean = false;
  showNewAlertForm: boolean = false;
  newAlertForm = {
    name: '',
    experience: [] as string[],
    availability: [] as string[],
    location: [] as string[],
    skills: [] as string[]
  };
  
  // Variables temporaires pour les sélections multiples
  tempExperience: string[] = [];
  tempAvailability: string[] = [];
  tempLocation: string[] = []; 
  tempSkills: string[] = [];
  
  // Options pour les champs de sélection
  experienceOptions: string[] = ['Moins de 3 ans', '3-5 ans', '5-10 ans', '10+ ans'];
  availabilityOptions: string[] = ['Disponible maintenant', 'Disponible dans 15 jours', 'Disponible dans 30 jours', 'Disponible dans 60 jours'];
  locationOptions: string[] = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Remote'];
  skillOptions: string[] = ['JavaScript', 'Python', 'Java', 'C#', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'ASP.NET', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Science', 'TensorFlow', 'PyTorch', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'DevOps', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP'];
  countryOptions: string[] = ['France', 'Belgique', 'Suisse', 'Canada', 'Luxembourg', 'Allemagne', 'Espagne', 'Italie', 'Royaume-Uni', 'Pays-Bas'];
  
  // Valeurs des sélecteurs pour le nouveau format de filtres
  selectedExperience: string = '';
  selectedAvailability: string = '';
  selectedLocation: string = '';
  selectedSkill: string = '';
  selectedCountry: string | null = null;
  
  // États pour les dropdowns personnalisés
  experienceDropdownOpen: boolean = false;
  availabilityDropdownOpen: boolean = false;
  locationDropdownOpen: boolean = false;
  skillsDropdownOpen: boolean = false;
  
  // Subscription
  private subscription: Subscription = new Subscription();
  
  constructor(
    private alertService: AlertService,
    private router: Router,
    private elementRef: ElementRef
  ) {}
  
  ngOnInit(): void {
    // S'abonner aux changements d'état des alertes
    this.subscription.add(
      this.alertService.getAlertState().subscribe(state => {
        this.alerts = state.alerts;
        this.selectedAlertId = state.selectedAlertId;
      })
    );
    
    // Ajout d'alertes de test pour visualiser le défilement
    this.addTestAlerts();
    
    // Gestion des clics à l'extérieur des dropdowns pour les fermer
    this.addDropdownListeners();
  }
  
  /**
   * Ajoute des alertes de test pour visualiser le comportement du défilement
   * Cette méthode est temporaire et ne doit être utilisée que pour les tests
   */
  private addTestAlerts(): void {
    // Données des alertes de test
    const testAlerts = [
      { name: 'Développeurs JavaScript Senior à Paris', experience: ['5-10 ans'], availability: ['Disponible maintenant'], location: ['Paris'], skills: ['JavaScript', 'React', 'Node.js'], country: 'France' },
      { name: 'Architectes Java en remote', experience: ['10+ ans'], availability: ['Disponible dans 30 jours'], location: ['Remote'], skills: ['Java', 'Spring', 'Microservices'], country: 'France' },
      { name: 'Développeurs Python à Lyon', experience: ['3-5 ans'], availability: ['Disponible dans 30 jours', 'Disponible dans 60 jours'], location: ['Lyon'], skills: ['Python', 'Django', 'Flask'], country: 'France' },
      { name: 'Experts DevOps en France', experience: ['5-10 ans', '10+ ans'], availability: ['Disponible maintenant'], location: ['Paris', 'Lyon', 'Bordeaux'], skills: ['Kubernetes', 'Docker', 'AWS'], country: 'France' },
      { name: 'Développeurs .NET à Bruxelles', experience: ['Moins de 3 ans', '3-5 ans'], availability: ['Disponible maintenant'], location: ['Bruxelles'], skills: ['.NET', 'C#', 'Azure'], country: 'Belgique' },
      { name: 'Data Scientists en Île-de-France', experience: ['5-10 ans'], availability: ['Disponible dans 30 jours'], location: ['Paris'], skills: ['Python', 'Machine Learning', 'TensorFlow'], country: 'France' },
      { name: 'Développeurs Mobile à Toulouse', experience: ['3-5 ans', '5-10 ans'], availability: ['Disponible maintenant', 'Disponible dans 15 jours'], location: ['Toulouse'], skills: ['Swift', 'Flutter', 'React Native'], country: 'France' },
      { name: 'Développeurs Frontend React à Nice', experience: ['Moins de 3 ans', '3-5 ans'], availability: ['Disponible dans 30 jours'], location: ['Nice'], skills: ['React', 'TypeScript', 'CSS'], country: 'France' },
      { name: 'Experts Sécurité en France', experience: ['10+ ans'], availability: ['Disponible dans 60 jours'], location: ['Paris', 'Lyon', 'Marseille'], skills: ['Cybersécurité', 'Pentesting', 'ISO 27001'], country: 'France' },
      { name: 'Développeurs Full Stack à Lille', experience: ['3-5 ans', '5-10 ans'], availability: ['Disponible maintenant'], location: ['Lille'], skills: ['JavaScript', 'Node.js', 'React', 'MongoDB'], country: 'France' },
      { name: 'Ingénieurs Data à Nantes', experience: ['5-10 ans'], availability: ['Disponible dans 30 jours'], location: ['Nantes'], skills: ['Python', 'Hadoop', 'Spark'], country: 'France' },
      { name: 'Développeurs PHP à Marseille', experience: ['3-5 ans'], availability: ['Disponible maintenant'], location: ['Marseille'], skills: ['PHP', 'Laravel', 'Symfony'], country: 'France' },
      { name: 'UX/UI Designers en France', experience: ['5-10 ans'], availability: ['Disponible dans 30 jours'], location: ['Paris', 'Lyon', 'Bordeaux'], skills: ['Figma', 'Adobe XD', 'Design Thinking'], country: 'France' },
      { name: 'Développeurs Blockchain à Paris', experience: ['5-10 ans', '10+ ans'], availability: ['Disponible dans 60 jours'], location: ['Paris'], skills: ['Solidity', 'Ethereum', 'Smart Contracts'], country: 'France' },
      { name: 'Administrateurs Systèmes à Lyon', experience: ['3-5 ans', '5-10 ans'], availability: ['Disponible maintenant'], location: ['Lyon'], skills: ['Linux', 'Windows Server', 'Scripting'], country: 'France' },
      { name: 'Développeurs Vue.js à Strasbourg', experience: ['Moins de 3 ans', '3-5 ans'], availability: ['Disponible dans 30 jours'], location: ['Strasbourg'], skills: ['Vue.js', 'JavaScript', 'CSS'], country: 'France' },
      { name: 'Consultants SAP à Paris', experience: ['5-10 ans', '10+ ans'], availability: ['Disponible dans 60 jours'], location: ['Paris'], skills: ['SAP', 'ERP', 'ABAP'], country: 'France' },
      { name: 'Développeurs Ruby à Bordeaux', experience: ['3-5 ans'], availability: ['Disponible maintenant'], location: ['Bordeaux'], skills: ['Ruby', 'Rails', 'PostgreSQL'], country: 'France' },
      { name: 'Ingénieurs QA à Montpellier', experience: ['5-10 ans'], availability: ['Disponible dans 30 jours'], location: ['Montpellier'], skills: ['Test Automation', 'Selenium', 'Cypress'], country: 'France' },
      { name: 'Développeurs Golang à Annecy', experience: ['5-10 ans'], availability: ['Disponible maintenant'], location: ['Annecy'], skills: ['Go', 'Microservices', 'Docker'], country: 'France' }
    ];
    
    // Créer des alertes avec des ID uniques et des dates aléatoires
    const now = new Date();
    testAlerts.forEach((alertData, index) => {
      // Générer des dates aléatoires pour la création et dernière mise à jour
      const createdDaysAgo = Math.floor(Math.random() * 90); // 0 à 90 jours
      const updatedDaysAgo = Math.floor(Math.random() * createdDaysAgo); // Entre 0 et createdDaysAgo jours
      
      const createdAt = new Date(now.getTime() - (createdDaysAgo * 24 * 60 * 60 * 1000));
      const updatedAt = new Date(now.getTime() - (updatedDaysAgo * 24 * 60 * 60 * 1000));
      
      // Créer un nombre aléatoire de nouveaux consultants pour chaque alerte
      const newConsultantCount = Math.floor(Math.random() * 5); // 0 à 4 nouveaux consultants
      
      // Déterminer si l'alerte a été consultée récemment
      const hasBeenViewed = Math.random() > 0.3; // 70% de chance d'avoir été vue
      const lastViewedAt = hasBeenViewed 
        ? new Date(now.getTime() - (Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000)) 
        : null;
      
      // Créer l'objet alerte conforme à l'interface Alert
      const alert: Alert = {
        id: `test-alert-${index + 1}`,
        name: alertData.name,
        criteria: {
          experience: alertData.experience,
          availability: alertData.availability,
          location: alertData.location,
          skills: alertData.skills,
          country: alertData.country
        },
        newConsultantCount: newConsultantCount,
        createdAt: createdAt,
        updatedAt: updatedAt,
        lastViewedAt: lastViewedAt
      };
      
      // Ajouter l'alerte à la liste
      this.alerts.push(alert);
    });
  }
  
  /**
   * Ajoute des écouteurs d'événements pour gérer les clics en dehors des dropdowns
   */
  private addDropdownListeners(): void {
    // Utilisation de HostListener pour gérer les clics document
    document.addEventListener('click', this.closeDropdownsOnClickOutside.bind(this));
    
    // Ajouter un écouteur pour le redimensionnement de la fenêtre
    window.addEventListener('resize', this.handleWindowResize.bind(this));
  }
  
  /**
   * Gère le redimensionnement de la fenêtre
   */
  private handleWindowResize(): void {
    // Repositionner les menus déroulants ouverts
    if (this.experienceDropdownOpen) {
      const dropdown = this.elementRef.nativeElement.querySelector('.custom-dropdown.experience');
      const trigger = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (trigger && menu) {
        this.positionDropdownMenu(trigger, menu);
      }
    }
    
    if (this.availabilityDropdownOpen) {
      const dropdown = this.elementRef.nativeElement.querySelector('.custom-dropdown.availability');
      const trigger = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (trigger && menu) {
        this.positionDropdownMenu(trigger, menu);
      }
    }
    
    if (this.locationDropdownOpen) {
      const dropdown = this.elementRef.nativeElement.querySelector('.custom-dropdown.location');
      const trigger = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (trigger && menu) {
        this.positionDropdownMenu(trigger, menu);
      }
    }
    
    if (this.skillsDropdownOpen) {
      const dropdown = this.elementRef.nativeElement.querySelector('.custom-dropdown.skills');
      const trigger = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (trigger && menu) {
        this.positionDropdownMenu(trigger, menu);
      }
    }
  }
  
  /**
   * Ferme les dropdowns si on clique en dehors
   */
  private closeDropdownsOnClickOutside(event: MouseEvent): void {
    if (this.experienceDropdownOpen || this.availabilityDropdownOpen || this.locationDropdownOpen || this.skillsDropdownOpen) {
      const target = event.target as HTMLElement;
      if (!this.elementRef.nativeElement.contains(target) || 
          !target.closest('.custom-dropdown')) {
        this.experienceDropdownOpen = false;
        this.availabilityDropdownOpen = false;
        this.locationDropdownOpen = false;
        this.skillsDropdownOpen = false;
      }
    }
  }
  
  ngOnDestroy(): void {
    // Nettoyer les abonnements
    this.subscription.unsubscribe();
    
    // Supprimer les écouteurs d'événements
    document.removeEventListener('click', this.closeDropdownsOnClickOutside.bind(this));
    window.removeEventListener('resize', this.handleWindowResize.bind(this));
  }
  
  /**
   * Positionne le menu déroulant par rapport à son déclencheur
   * @param trigger Élément déclencheur
   * @param menu Menu déroulant à positionner
   * @param dropdown Conteneur du dropdown (optionnel)
   * @param menuHeight Hauteur du menu (optionnel)
   */
  positionDropdownMenu(trigger: HTMLElement, menu: HTMLElement, dropdown?: HTMLElement, menuHeight?: number): void {
    if (!trigger || !menu) return;
    
    // Obtenir les dimensions et la position du déclencheur
    const triggerRect = trigger.getBoundingClientRect();
    
    // Définir la position du menu
    menu.style.position = 'fixed';
    menu.style.width = `${triggerRect.width}px`;
    menu.style.top = `${triggerRect.bottom + window.scrollY + 5}px`; // Un peu d'espace
    menu.style.left = `${triggerRect.left}px`;
    menu.style.zIndex = '10000'; // Assurer un z-index élevé pour être au-dessus de tout
    
    // Utiliser la hauteur fournie ou calculer la hauteur
    const actualMenuHeight = menuHeight || menu.offsetHeight;
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - triggerRect.bottom;
    
    // Si l'espace en dessous est insuffisant, positionner au-dessus
    if (actualMenuHeight > spaceBelow) {
      menu.style.top = `${triggerRect.top - actualMenuHeight - 5}px`;
    }
  }
  
  /**
   * Ouvre ou ferme le dropdown d'expérience
   */
  toggleExperienceDropdown(event: Event): void {
    event.stopPropagation();
    this.experienceDropdownOpen = !this.experienceDropdownOpen;
    
    if (this.experienceDropdownOpen) {
      this.locationDropdownOpen = false;
      this.skillsDropdownOpen = false;
      this.availabilityDropdownOpen = false;
      
      // Positionner le menu après qu'il soit rendu (setTimeout)
      setTimeout(() => {
        const dropdown = this.elementRef.nativeElement.querySelector('.custom-dropdown.experience');
        const trigger = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu.experience-menu');
        
        if (trigger && menu) {
          // Obtenir les coordonnées exactes du bouton déclencheur pour référence
          const rect = trigger.getBoundingClientRect();
          
          // Positionner le menu en utilisant position absolute
          menu.style.position = 'absolute';
          menu.style.width = `${trigger.offsetWidth}px`;
          menu.style.left = '0'; // Aligné à gauche du parent
          menu.style.top = '100%'; // Juste en dessous du parent
          menu.style.marginTop = '5px'; // Petit espace entre le bouton et le menu
          menu.style.zIndex = '10000';
          menu.style.display = 'block';
          
          // Ajouter un log visuel pour le débogage
          console.log('Position du menu d\'expérience:', {
            width: menu.style.width,
            position: menu.style.position,
            left: menu.style.left,
            top: menu.style.top,
            marginTop: menu.style.marginTop
          });
        }
      }, 0);
    }
  }
  
  /**
   * Ouvre ou ferme le dropdown de disponibilité
   */
  toggleAvailabilityDropdown(event: Event): void {
    event.stopPropagation();
    this.availabilityDropdownOpen = !this.availabilityDropdownOpen;
    
    if (this.availabilityDropdownOpen) {
      this.experienceDropdownOpen = false;
      this.locationDropdownOpen = false;
      this.skillsDropdownOpen = false;
      
      // Positionner le menu après qu'il soit rendu (setTimeout)
      setTimeout(() => {
        const dropdown = this.elementRef.nativeElement.querySelector('.custom-dropdown.availability');
        const trigger = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu.availability-menu');
        
        if (trigger && menu) {
          // Obtenir les coordonnées exactes du bouton déclencheur pour référence
          const rect = trigger.getBoundingClientRect();
          
          // Positionner le menu en utilisant position absolute
          menu.style.position = 'absolute';
          menu.style.width = `${trigger.offsetWidth}px`;
          menu.style.left = '0'; // Aligné à gauche du parent
          menu.style.top = '100%'; // Juste en dessous du parent
          menu.style.marginTop = '5px'; // Petit espace entre le bouton et le menu
          menu.style.zIndex = '10000';
          menu.style.display = 'block';
          
          // Ajouter un log visuel pour le débogage
          console.log('Position du menu de disponibilité:', {
            width: menu.style.width,
            position: menu.style.position,
            left: menu.style.left,
            top: menu.style.top,
            marginTop: menu.style.marginTop
          });
        }
      }, 0);
    }
  }
  
  /**
   * Ouvre ou ferme le dropdown de localisation
   */
  toggleLocationDropdown(event: Event): void {
    event.stopPropagation();
    this.locationDropdownOpen = !this.locationDropdownOpen;
    
    if (this.locationDropdownOpen) {
      this.experienceDropdownOpen = false;
      this.availabilityDropdownOpen = false;
      this.skillsDropdownOpen = false;
      
      // Positionner le menu après qu'il soit rendu (setTimeout)
      setTimeout(() => {
        const dropdown = this.elementRef.nativeElement.querySelector('.custom-dropdown.location');
        const trigger = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu.location-menu');
        
        if (trigger && menu) {
          // Obtenir les coordonnées exactes du bouton déclencheur pour référence
          const rect = trigger.getBoundingClientRect();
          
          // Positionner le menu en utilisant position absolute
          menu.style.position = 'absolute';
          menu.style.width = `${trigger.offsetWidth}px`;
          menu.style.left = '0'; // Aligné à gauche du parent
          menu.style.top = '100%'; // Juste en dessous du parent
          menu.style.marginTop = '5px'; // Petit espace entre le bouton et le menu
          menu.style.zIndex = '10000';
          menu.style.display = 'block';
          
          // Ajouter un log visuel pour le débogage
          console.log('Position du menu de localisation:', {
            width: menu.style.width,
            position: menu.style.position,
            left: menu.style.left,
            top: menu.style.top,
            marginTop: menu.style.marginTop
          });
        }
      }, 0);
    }
  }
  
  /**
   * Ouvre ou ferme le dropdown de compétences
   */
  toggleSkillsDropdown(event: Event): void {
    event.stopPropagation();
    this.skillsDropdownOpen = !this.skillsDropdownOpen;
    
    if (this.skillsDropdownOpen) {
      this.experienceDropdownOpen = false;
      this.locationDropdownOpen = false;
      this.availabilityDropdownOpen = false;
      
      // Positionner le menu après qu'il soit rendu (setTimeout)
      setTimeout(() => {
        const dropdown = this.elementRef.nativeElement.querySelector('.custom-dropdown.skills');
        const trigger = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu.skills-menu');
        
        if (trigger && menu) {
          // Obtenir les coordonnées exactes du bouton déclencheur pour référence
          const rect = trigger.getBoundingClientRect();
          
          // Positionner le menu en utilisant position absolute
          menu.style.position = 'absolute';
          menu.style.width = `${trigger.offsetWidth}px`;
          menu.style.left = '0'; // Aligné à gauche du parent
          menu.style.top = '100%'; // Juste en dessous du parent
          menu.style.marginTop = '5px'; // Petit espace entre le bouton et le menu
          menu.style.zIndex = '10000';
          menu.style.display = 'block';
          
          // Ajouter un log visuel pour le débogage
          console.log('Position du menu de compétences:', {
            width: menu.style.width,
            position: menu.style.position,
            left: menu.style.left,
            top: menu.style.top,
            marginTop: menu.style.marginTop
          });
        }
      }, 0);
    }
  }
  

  
  /**
   * Met à jour le filtre d'expérience quand le menu déroulant change
   */
  updateExperienceFilter(): void {
    if (this.selectedExperience) {
      // Si une nouvelle valeur est sélectionnée, l'ajouter si elle n'existe pas déjà
      if (!this.tempExperience.includes(this.selectedExperience)) {
        this.tempExperience = [this.selectedExperience];
      }
    } else {
      // Si "Tout niveau" est sélectionné, effacer la sélection
      this.tempExperience = [];
    }
  }
  
  /**
   * Met à jour le filtre de disponibilité quand le menu déroulant change
   */
  updateAvailabilityFilter(): void {
    if (this.selectedAvailability) {
      // Si une nouvelle valeur est sélectionnée, l'ajouter si elle n'existe pas déjà
      if (!this.tempAvailability.includes(this.selectedAvailability)) {
        this.tempAvailability = [this.selectedAvailability];
      }
    } else {
      // Si "Toutes" est sélectionné, effacer la sélection
      this.tempAvailability = [];
    }
  }
  
  /**
   * Met à jour le filtre de localisation quand le menu déroulant change
   */
  updateLocationFilter(): void {
    if (this.selectedLocation) {
      // Si une nouvelle valeur est sélectionnée, l'ajouter si elle n'existe pas déjà
      if (!this.tempLocation.includes(this.selectedLocation)) {
        this.tempLocation = [this.selectedLocation];
      }
    } else {
      // Si "Toutes" est sélectionné, effacer la sélection
      this.tempLocation = [];
    }
  }
  
  /**
   * Met à jour le filtre de compétences quand le menu déroulant change
   */
  updateSkillFilter(): void {
    if (this.selectedSkill) {
      // Si une nouvelle valeur est sélectionnée, l'ajouter si elle n'existe pas déjà
      if (!this.tempSkills.includes(this.selectedSkill)) {
        this.tempSkills = [this.selectedSkill];
      }
    } else {
      // Si "Compétences" est sélectionné, effacer la sélection
      this.tempSkills = [];
    }
  }
  
  /**
   * Bascule la sélection d'une option d'expérience
   */
  toggleExperienceOption(experience: string, event: Event): void {
    event.stopPropagation();
    const index = this.tempExperience.indexOf(experience);
    if (index === -1) {
      this.tempExperience.push(experience);
    } else {
      this.tempExperience.splice(index, 1);
    }
    this.updateSelection('experience', null);
  }
  
  /**
   * Bascule la sélection d'une option de disponibilité
   */
  toggleAvailabilityOption(availability: string, event: Event): void {
    event.stopPropagation();
    const index = this.tempAvailability.indexOf(availability);
    if (index === -1) {
      this.tempAvailability.push(availability);
    } else {
      this.tempAvailability.splice(index, 1);
    }
    this.updateSelection('availability', null);
  }
  
  /**
   * Bascule la sélection d'une option de localisation
   */
  toggleLocationOption(location: string, event: Event): void {
    event.stopPropagation();
    const index = this.tempLocation.indexOf(location);
    if (index === -1) {
      this.tempLocation.push(location);
    } else {
      this.tempLocation.splice(index, 1);
    }
    this.updateSelection('location', null);
  }
  
  /**
   * Bascule la sélection d'une option de compétence
   */
  toggleSkillOption(skill: string, event: Event): void {
    event.stopPropagation();
    const index = this.tempSkills.indexOf(skill);
    if (index === -1) {
      this.tempSkills.push(skill);
    } else {
      this.tempSkills.splice(index, 1);
    }
    this.updateSelection('skills', null);
  }
  
  /**
   * Obtient le texte à afficher dans le bouton de dropdown d'expérience
   */
  getExperienceDisplayText(): string {
    return this.tempExperience.length > 0 
      ? `${this.tempExperience.length} niveau${this.tempExperience.length > 1 ? 'x' : ''}`
      : 'Niveaux d\'expérience';
  }
  
  /**
   * Obtient le texte à afficher dans le bouton de dropdown de disponibilité
   */
  getAvailabilityDisplayText(): string {
    return this.tempAvailability.length > 0 
      ? `${this.tempAvailability.length} disponibilité${this.tempAvailability.length > 1 ? 's' : ''}`
      : 'Disponibilités';
  }
  
  /**
   * Obtient le texte à afficher dans le bouton de dropdown de localisation
   */
  getLocationDisplayText(): string {
    return this.tempLocation.length > 0 
      ? `${this.tempLocation.length} localisation${this.tempLocation.length > 1 ? 's' : ''}`
      : 'Localisations';
  }
  
  /**
   * Obtient le texte à afficher dans le bouton de dropdown de compétences
   */
  getSkillsDisplayText(): string {
    return this.tempSkills.length > 0
      ? `${this.tempSkills.length} compétence${this.tempSkills.length > 1 ? 's' : ''}`
      : 'Compétences';
  }
  
  /**
   * Affiche le formulaire de création d'une nouvelle alerte
   */
  showCreateAlertForm(): void {
    this.showNewAlertForm = true;
    this.resetNewAlertForm();
  }
  
  /**
   * Masque le formulaire de création d'une nouvelle alerte
   */
  hideCreateAlertForm(): void {
    this.showNewAlertForm = false;
    this.editingAlertId = null;
  }
  
  /**
   * Réinitialise le formulaire de création d'une nouvelle alerte
   */
  resetNewAlertForm(): void {
    this.newAlertForm = {
      name: '',
      experience: [],
      availability: [],
      location: [],
      skills: []
    };
    
    // Réinitialiser également les variables temporaires
    this.tempExperience = [];
    this.tempAvailability = [];
    this.tempLocation = [];
    this.tempSkills = [];
    this.selectedCountry = null;
    
    // Réinitialiser l'état d'édition
    this.editingAlertId = null;
  }
  
  /**
   * Crée une nouvelle alerte
   */
  createAlert(): void {
    if (this.newAlertForm.name.trim() === '') {
      alert('Veuillez saisir un nom pour l\'alerte.');
      return;
    }
    
    if (this.tempExperience.length === 0 && 
        this.tempAvailability.length === 0 && 
        this.tempLocation.length === 0 && 
        this.tempSkills.length === 0) {
      alert('Veuillez sélectionner au moins un critère pour l\'alerte.');
      return;
    }
    
    const criteria: AlertCriteria = {
      experience: this.tempExperience,
      availability: this.tempAvailability,
      location: this.tempLocation,
      skills: this.tempSkills,
      country: this.selectedCountry
    };
    
    const alertId = this.alertService.createAlert(this.newAlertForm.name.trim(), criteria);
    this.hideCreateAlertForm();
    
    // Sélectionner automatiquement la nouvelle alerte
    this.alertService.selectAlert(alertId);
  }
  
  /**
   * Édite une alerte existante
   * @param alert Alerte à éditer
   */
  editAlert(alert: Alert): void {
    this.newAlertForm = {
      name: alert.name,
      experience: [...alert.criteria.experience],
      availability: [...alert.criteria.availability],
      location: [...alert.criteria.location],
      skills: [...alert.criteria.skills]
    };
    
    // Initialiser les variables temporaires pour les select multiples
    this.tempExperience = [...alert.criteria.experience];
    this.tempAvailability = [...alert.criteria.availability];
    this.tempLocation = [...alert.criteria.location];
    this.tempSkills = [...alert.criteria.skills];
    
    // Initialiser le pays sélectionné
    this.selectedCountry = alert.criteria.country;
    
    this.editingAlertId = alert.id;
    this.showNewAlertForm = true;
  }
  
  /**
   * Met à jour une alerte existante
   */
  updateAlert(): void {
    if (!this.editingAlertId) return;
    
    if (this.newAlertForm.name.trim() === '') {
      alert('Veuillez saisir un nom pour l\'alerte.');
      return;
    }
    
    if (this.tempExperience.length === 0 && 
        this.tempAvailability.length === 0 && 
        this.tempLocation.length === 0 && 
        this.tempSkills.length === 0) {
      alert('Veuillez sélectionner au moins un critère pour l\'alerte.');
      return;
    }
    
    const criteria: AlertCriteria = {
      experience: this.tempExperience,
      availability: this.tempAvailability,
      location: this.tempLocation,
      skills: this.tempSkills,
      country: this.selectedCountry
    };
    
    this.alertService.updateAlert(this.editingAlertId, this.newAlertForm.name.trim(), criteria);
    this.editingAlertId = null;
    this.hideCreateAlertForm();
  }
  
  /**
   * Supprime une alerte
   * @param alertId Identifiant de l'alerte à supprimer
   * @param event Événement de clic
   */
  deleteAlert(alertId: string, event: Event): void {
    event.stopPropagation();
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette alerte ?')) {
      this.alertService.deleteAlert(alertId);
    }
  }
  
  /**
   * Sélectionne une alerte
   * @param alertId Identifiant de l'alerte à sélectionner
   */
  selectAlert(alertId: string): void {
    this.alertService.selectAlert(alertId);
  }
  
  /**
   * Désélectionne l'alerte actuellement sélectionnée
   */
  clearSelection(): void {
    this.alertService.selectAlert(null);
  }
  
  /**
   * Vérifie si une alerte a de nouveaux consultants
   * @param alertId Identifiant de l'alerte
   * @returns Vrai si l'alerte a de nouveaux consultants, faux sinon
   */
  hasNewConsultants(alertId: string): boolean {
    const alert = this.alerts.find(a => a.id === alertId);
    return alert ? alert.newConsultantCount > 0 : false;
  }
  
  /**
   * Obtient le nombre de nouveaux consultants dans une alerte
   * @param alertId Identifiant de l'alerte
   * @returns Nombre de nouveaux consultants
   */
  getNewConsultantCount(alertId: string): number {
    const alert = this.alerts.find(a => a.id === alertId);
    return alert ? alert.newConsultantCount : 0;
  }
  
  /**
   * Empêche la propagation d'un événement
   */
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
  
  /**
   * Vérifie si la valeur est dans le tableau
   * Utilisé pour les sélections multiples dans le formulaire
   */
  isSelected(array: string[], value: string): boolean {
    return array.includes(value);
  }
  
  /**
   * Ajoute ou supprime une valeur du tableau
   * Utilisé pour les sélections multiples dans le formulaire
   */
  toggleSelection(array: string[], value: string): void {
    const index = array.indexOf(value);
    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }
  }
  
  /**
   * Gère les changements d'option dans les cases à cocher
   */
  toggleOption(type: string, value: string): void {
    switch (type) {
      case 'experience':
        const expIndex = this.tempExperience.indexOf(value);
        if (expIndex === -1) {
          this.tempExperience.push(value);
        } else {
          this.tempExperience.splice(expIndex, 1);
        }
        this.updateSelection('experience', null);
        break;
      case 'availability':
        const availIndex = this.tempAvailability.indexOf(value);
        if (availIndex === -1) {
          this.tempAvailability.push(value);
        } else {
          this.tempAvailability.splice(availIndex, 1);
        }
        this.updateSelection('availability', null);
        break;
      case 'location':
        const locIndex = this.tempLocation.indexOf(value);
        if (locIndex === -1) {
          this.tempLocation.push(value);
        } else {
          this.tempLocation.splice(locIndex, 1);
        }
        this.updateSelection('location', null);
        break;
    }
  }
  
  /**
   * Met à jour les tableaux de sélection depuis les select multiple
   * @param type Type de critère à mettre à jour
   * @param event Événement de changement
   */
  updateSelection(type: string, event: any): void {
    switch(type) {
      case 'experience':
        this.newAlertForm.experience = [...this.tempExperience];
        break;
      case 'availability':
        this.newAlertForm.availability = [...this.tempAvailability];
        break;
      case 'location':
        this.newAlertForm.location = [...this.tempLocation];
        break;
      case 'skills':
        this.newAlertForm.skills = [...this.tempSkills];
        break;
    }
  }
  
  /**
   * Obtient un résumé des critères pour affichage
   * @param criteria Critères de l'alerte
   * @returns Chaîne de caractères formatée
   */
  getCriteriaSummary(criteria: AlertCriteria): string {
    const parts = [];
    
    if (criteria.country) {
      parts.push(`Pays: ${criteria.country}`);
    }
    
    if (criteria.experience.length > 0) {
      parts.push(`Exp: ${criteria.experience.join(', ')}`);
    }
    
    if (criteria.location.length > 0) {
      parts.push(`Lieu: ${criteria.location.join(', ')}`);
    }
    
    if (criteria.skills.length > 0) {
      let skillsSummary = criteria.skills.slice(0, 2).join(', ');
      if (criteria.skills.length > 2) {
        skillsSummary += ` +${criteria.skills.length - 2}`;
      }
      parts.push(`Skills: ${skillsSummary}`);
    }
    
    return parts.join(' | ');
  }
}