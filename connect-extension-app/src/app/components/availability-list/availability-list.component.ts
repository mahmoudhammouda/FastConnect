import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultantAvailability } from '../../models/consultant-availability.model';
import { ConsultantAvailabilityService } from '../../services/consultant-availability.service';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// (Référence à AddAvailabilityModalComponent supprimée)
declare global {
  interface Window {
    initFlowbite: any;
    flowbite: any;
    Dropdown: any;
  }
}

@Component({
  selector: 'app-availability-list',
  templateUrl: './availability-list.component.html',
  styleUrls: ['./availability-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AvailabilityListComponent implements OnInit, AfterViewInit {
  consultantAvailabilities: ConsultantAvailability[] = [];
  loading: boolean = false;
  error: boolean = false;

  editingAvailabilityId: string | null = null;
  editForm: FormGroup | null = null;
  skillsInput: string = '';

  // Getters pour faciliter l'accès dans le template
  get skillsValues(): any[] {
    return this.editForm?.get('skills')?.value || [];
  }

  get sectorsValues(): any[] {
    return this.editForm?.get('sectors')?.value || [];
  }

  get citiesValues(): any[] {
    return this.editForm?.get('cities')?.value || [];
  }
  citiesInput: string = '';
  sectorsInput: string = '';
  workModesInput: string = '';
  
  // Propriétés pour le modal d'ajout
  showAddModal: boolean = false;
  
  // Propriétés pour le modal de confirmation de suppression
  showDeleteConfirmationModal: boolean = false;
  availabilityToDelete: ConsultantAvailability | null = null;
  
  // État des dropdowns
  skillsDropdownOpen: boolean = false;
  citiesDropdownOpen: boolean = false;
  sectorsDropdownOpen: boolean = false;
  workModesDropdownOpen: boolean = false;
  
  // Propriétés pour le sélecteur de pays dans le téléphone
  selectedPhoneCountryCode: string = '+33';
  phoneCountryCodes: { [key: string]: string } = {
    'France': '+33',
    'Belgique': '+32',
    'Suisse': '+41',
    'Luxembourg': '+352',
    'États-Unis': '+1',
    'Royaume-Uni': '+44'
  };
  // État du dropdown du téléphone
  phoneDropdownOpen: boolean = false;
  // Pays disponibles pour le téléphone
  phoneCountries = [
    { name: 'France', code: '+33', flag: 'fr' },
    { name: 'Belgique', code: '+32', flag: 'be' },
    { name: 'Suisse', code: '+41', flag: 'ch' },
    { name: 'Luxembourg', code: '+352', flag: 'lu' },
    { name: 'États-Unis', code: '+1', flag: 'us' },
    { name: 'Royaume-Uni', code: '+44', flag: 'gb' }
  ];
  
  // Gestion du fichier CV
  selectedCvFile: File | null = null;
  
  // Listes disponibles
  availableSkills: string[] = [];
  availableCities: string[] = [];
  availableSectors: string[] = [];
  availableRoles: string[] = [];
  rolesDropdownOpen: boolean = false;
  rolesInput: string = '';
  
  experienceLevels = [
    { value: 'junior', label: 'Moins de 3 ans' },
    { value: 'intermediate', label: '3-5 ans' },
    { value: 'senior', label: '5-10 ans' },
    { value: 'expert', label: '10+ ans' }
  ];
  
  // Options supplémentaires inspirées de add-availability-modal
  roleOptions = [
    'Développeur Full-Stack', 'Développeur Front-End', 'Développeur Back-End', 
    'Développeur Mobile', 'Développeur .NET', 'Développeur Java', 'Développeur PHP', 
    'Développeur Python', 'DevOps Engineer', 'Data Scientist', 'Data Engineer', 
    'SRE Engineer', 'UX/UI Designer', 'Product Owner', 'Scrum Master', 'Chef de Projet', 
    'Architecte Logiciel', 'Tech Lead', 'QA Engineer', 'Business Analyst'
  ];
  
  countries = ['France', 'Belgique', 'Suisse', 'Luxembourg', 'Allemagne', 'Espagne', 'Italie', 'Royaume-Uni', 'Pays-Bas'];
  
  cities: { [key: string]: string[] } = {
    'France': ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Nantes', 'Strasbourg', 'Toulouse', 'Nice', 'Rennes'],
    'Belgique': ['Bruxelles', 'Anvers', 'Gand', 'Liège', 'Bruges', 'Namur', 'Louvain'],
    'Suisse': ['Genève', 'Zürich', 'Bâle', 'Lausanne', 'Berne', 'Lugano'],
    'Luxembourg': ['Luxembourg-Ville', 'Esch-sur-Alzette', 'Differdange', 'Dudelange'],
    'Allemagne': ['Berlin', 'Munich', 'Francfort', 'Hambourg', 'Cologne', 'Düsseldorf', 'Stuttgart'],
    'Espagne': ['Madrid', 'Barcelone', 'Valence', 'Séville', 'Bilbao', 'Malaga'],
    'Italie': ['Rome', 'Milan', 'Naples', 'Turin', 'Florence', 'Venise', 'Bologne'],
    'Royaume-Uni': ['Londres', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool', 'Édimbourg', 'Bristol'],
    'Pays-Bas': ['Amsterdam', 'Rotterdam', 'La Haye', 'Utrecht', 'Eindhoven']
  };
  
  skillsList = [
    'JavaScript', 'TypeScript', 'Angular', 'React', 'Vue.js', 'Node.js', 'PHP', 'Laravel', 
    'Symfony', 'Python', 'Django', 'Flask', 'Ruby', 'Ruby on Rails', '.NET', 'C#', 'Java', 
    'Spring', 'Kotlin', 'Swift', 'iOS', 'Android', 'React Native', 'Flutter', 'AWS', 
    'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'DevOps', 'SQL', 'NoSQL', 'MongoDB', 
    'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'GraphQL', 'REST API', 'Microservices', 
    'Architecture', 'Agile', 'Scrum', 'Product Owner', 'UX/UI', 'Figma', 'Adobe XD'
  ];
  
  sectors = [
    'Banque & Finance', 'Assurance', 'Santé', 'Retail & E-commerce', 'Industrie', 
    'Transport & Logistique', 'Énergie', 'Télécommunications', 'Média & Divertissement', 
    'Services Publics', 'Luxe', 'Éducation', 'Agroalimentaire', 'Immobilier', 
    'Technologie & Startups'
  ];
  
  expertises = [
    'Développement Web', 'Développement Mobile', 'Cloud & DevOps', 'Base de Données', 
    'IA & Machine Learning', 'Big Data', 'Sécurité Informatique', 'Blockchain', 'IoT', 
    'CRM & ERP', 'Business Intelligence', 'API & Integration', 'Low-Code/No-Code', 
    'UX/UI Design', 'Infrastructure'
  ];
  
  engagementTypes = ['Freelance', 'Salarié', 'Sous-traitance'];
  workModes = [
    { value: 'onsite', label: 'Sur site' },
    { value: 'remote', label: 'Télétravail' },
    { value: 'hybrid', label: 'Hybride' }
  ];
  
  // Liste simplifiée pour le dropdown
  workModesList = ['Sur site', 'Télétravail', 'Hybride', 'Flexible'];
  
  // Types de CV disponibles
  cvTypes = [
    { value: 'linkedin', label: 'Profil LinkedIn', icon: 'fab fa-linkedin text-blue-600', bgColor: 'bg-blue-100', borderColor: 'border-blue-600' },
    { value: 'url', label: 'URL de CV en ligne', icon: 'fas fa-link text-emerald-600', bgColor: 'bg-emerald-100', borderColor: 'border-emerald-600' },
    { value: 'file', label: 'Fichier CV', icon: 'fas fa-file-pdf text-rose-600', bgColor: 'bg-rose-100', borderColor: 'border-rose-600' }
  ];
  
  statuses = [
    { value: 'available', label: 'Disponible' },
    { value: 'pending', label: 'En attente' },
    { value: 'inactive', label: 'Inactive' }
  ];
  
  constructor(
    private consultantAvailabilityService: ConsultantAvailabilityService,
    private modalService: ModalService
  ) {}
  
  ngOnInit(): void {
    this.loadAvailabilities();
    this.initAvailableLists();
  }
  
  ngAfterViewInit(): void {
    // Initialize flowbite dropdown menu for phone country selection
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        // S'assurer que flowbite est correctement initialisé
        if (window.flowbite) {
          console.log('Initialisation directe de Flowbite dropdowns...');
          
          // Initialiser explicitement le dropdown pour le téléphone
          const dropdownButton = document.getElementById('dropdown-phone-button');
          const dropdownMenu = document.getElementById('dropdown-phone');
          
          if (dropdownButton && dropdownMenu && window.flowbite.initDropdowns) {
            window.flowbite.initDropdowns(dropdownButton, dropdownMenu);
            console.log('Dropdown de téléphone initialisé avec succès');
          } else {
            console.warn('Éléments de dropdown introuvables ou flowbite.initDropdowns n\'est pas disponible');
          }
        } else if (window.initFlowbite) {
          window.initFlowbite();
          console.log('Flowbite initialisé via window.initFlowbite()');
        } else {
          console.warn('Flowbite non disponible dans window');
        }
      }
      
      // Ajouter les événements pour les options du pays
      this.setupPhoneCountrySelector();
    }, 500); // Augmenter le délai pour s'assurer que le DOM est complètement chargé
  }
  
  /**
   * Ouvre/ferme le dropdown du téléphone
   */
  togglePhoneDropdown(event: Event): void {
    event.stopPropagation();
    this.phoneDropdownOpen = !this.phoneDropdownOpen;
    
    // Fermer tous les autres dropdowns
    this.skillsDropdownOpen = false;
    this.citiesDropdownOpen = false;
    this.sectorsDropdownOpen = false;
    this.engagementTypeDropdownOpen = false;
    this.workModesDropdownOpen = false;
    this.rolesDropdownOpen = false;
  }
  
  /**
   * Sélectionne un pays pour le téléphone
   */
  selectPhoneCountry(country: any, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    this.selectedPhoneCountryCode = country.code;
    this.phoneDropdownOpen = false;
    
    // Mettre à jour le numéro de téléphone dans le formulaire si besoin
    this.updatePhoneWithCountryCode();
  }
  
  /**
   * Configure le sélecteur de pays pour le téléphone (méthode désactivée en faveur de notre implémentation manuelle)
   */
  private setupPhoneCountrySelector(): void {
    // Cette méthode n'est plus utilisée car nous avons remplacé le dropdown Flowbite par notre propre implémentation
    console.log('Utilisation du dropdown manuel pour le sélecteur de pays');
  }
  
  /**
   * Met à jour le numéro de téléphone avec le code pays sélectionné
   */
  private updatePhoneWithCountryCode(): void {
    // Cette méthode peut être utilisée pour traiter le numéro 
    // lors de la sauvegarde ou pour préfixer automatiquement le numéro
    if (this.editForm) {
      const phoneNumber = this.editForm.get('consultantPhone')?.value || '';
      
      // Logique pour mettre à jour le numéro si nécessaire
      // Vous pouvez l'adapter selon vos besoins
      console.log(`Téléphone mis à jour avec le code pays ${this.selectedPhoneCountryCode}: ${phoneNumber}`);
    }
  }
  
  /**
   * Initialise les listes disponibles pour les dropdowns
   */
  initAvailableLists(): void {
    this.availableSkills = [...this.skillsList];
    this.availableSectors = [...this.sectors];
    this.updateAvailableCities();
  }
  
  loadAvailabilities(): void {
    this.loading = true;
    this.error = false;
    
    // Données temporaires pour le développement et les tests
    // Ces données seront remplacées par les données réelles de l'API
    // lorsque celle-ci sera disponible
    const mockAvailabilities: ConsultantAvailability[] = [
      {
        id: '1',
        consultantId: '101',
        consultantName: 'Marie Dupont',
        role: 'Développeur Full-Stack',
        consultantRole: 'Développeur Full-Stack',
        title: 'Lead Developer Angular/Node.js',
        locked: false,
        startDate: '2025-05-01T00:00:00.000Z',
        durationInMonths: 3,
        status: 'available',
        cities: ['Paris', 'Lyon'],
        workMode: 'hybrid',
        rate: 650,
        skills: ['JavaScript', 'Angular', 'Node.js', 'MongoDB'],
        description: 'Développeuse full-stack avec 8 ans d\'expérience dans le développement de SaaS et d\'applications web.',
        sectors: ['Banque & Finance', 'Assurance'],
        experienceLevel: 'senior',
        country: 'France',
        engagementType: 'Freelance'
      },
      {
        id: '2',
        consultantId: '102',
        consultantName: 'Jean Martin',
        role: 'DevOps Engineer',
        consultantRole: 'DevOps Engineer',
        title: 'Cloud Architect AWS & Kubernetes',
        locked: true,
        startDate: '2025-06-15T00:00:00.000Z',
        durationInMonths: 6,
        status: 'pending',
        cities: ['Bordeaux'],
        workMode: 'remote',
        rate: 750,
        skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
        description: 'Ingénieur DevOps spécialisé dans la mise en place de pipelines CI/CD et d\'infrastructures cloud.',
        sectors: ['Technologie & Startups'],
        experienceLevel: 'expert',
        country: 'France',
        engagementType: 'Freelance'
      },
      {
        id: '3',
        consultantId: '103',
        consultantName: 'Sophie Petit',
        role: 'Data Scientist',
        consultantRole: 'Data Scientist',
        title: 'Machine Learning Specialist / Data Scientist',
        locked: false,
        startDate: '2025-04-20T00:00:00.000Z',
        durationInMonths: 2,
        status: 'available',
        cities: ['Paris', 'Lille'],
        workMode: 'onsite',
        rate: 680,
        skills: ['Python', 'TensorFlow', 'Pandas', 'SQL', 'Machine Learning'],
        description: 'Data scientist avec expertise en analyse prédictive et traitement du langage naturel.',
        sectors: ['Retail & E-commerce', 'Santé'],
        experienceLevel: 'intermediate',
        country: 'France',
        engagementType: 'Les deux'
      }
    ];
    
    // Ajouter plus de consultants avec des titres variés
    mockAvailabilities.push(
      {
        id: '4',
        consultantId: '104',
        consultantName: 'Pierre Dubois',
        role: 'Architecte Logiciel',
        consultantRole: 'Architecte Logiciel',
        title: 'Architecte Solutions Java/Spring',
        locked: true,
        startDate: '2025-05-10T00:00:00.000Z',
        durationInMonths: 4,
        status: 'available',
        cities: ['Lyon', 'Grenoble'],
        workMode: 'hybrid',
        rate: 800,
        skills: ['Java', 'Spring', 'Microservices', 'Oracle', 'Architecture'],
        description: 'Architecte logiciel avec 12 ans d\'expérience, spécialisé dans la conception de systèmes distribués.',
        sectors: ['Télécommunications', 'Banque & Finance'],
        experienceLevel: 'expert',
        country: 'France',
        engagementType: 'Freelance'
      },
      {
        id: '5',
        consultantId: '105',
        consultantName: 'Camille Laurent',
        role: 'UX/UI Designer',
        consultantRole: 'UX/UI Designer',
        title: 'Lead UX Designer & Product Strategist',
        locked: false,
        startDate: '2025-04-15T00:00:00.000Z',
        durationInMonths: 3,
        status: 'available',
        cities: ['Paris'],
        workMode: 'onsite',
        rate: 620,
        skills: ['Figma', 'Adobe XD', 'Design Thinking', 'User Research', 'Prototyping'],
        description: 'Designer UX/UI passionnée par la création d\'expériences utilisateur exceptionnelles.',
        sectors: ['Luxe', 'Média & Divertissement'],
        experienceLevel: 'senior',
        country: 'France',
        engagementType: 'Salarié'
      },
      {
        id: '6',
        consultantId: '106',
        consultantName: 'Lucas Moreau',
        role: 'Développeur Mobile',
        consultantRole: 'Développeur Mobile',
        title: 'Expert Mobile iOS & Flutter',
        locked: true,
        startDate: '2025-05-20T00:00:00.000Z',
        durationInMonths: 5,
        status: 'available',
        cities: ['Nantes', 'Rennes'],
        workMode: 'remote',
        rate: 700,
        skills: ['Swift', 'Flutter', 'Kotlin', 'Firebase', 'REST API'],
        description: 'Développeur mobile expérimenté, spécialisé dans la création d\'applications performantes et élégantes.',
        sectors: ['Retail & E-commerce', 'Transport & Logistique'],
        experienceLevel: 'senior',
        country: 'France',
        engagementType: 'Freelance'
      }
    );
    
    // Ajouter 20 consultants supplémentaires pour tester le scrolling
    const specialties = [
      'Front-End', 'Back-End', 'Full-Stack', 'Mobile', 'DevOps', 'Cloud', 
      'Data', 'BI', 'Security', 'QA', 'UX/UI', 'Product', 'Agile', 'Scrum',
      'Architecture', 'Infrastructure', 'Database', 'API', 'Microservices', 'Blockchain'
    ];
    
    const technologies = [
      'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', '.NET', 'PHP',
      'AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD',
      'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'GraphQL', 'REST', 'gRPC',
      'TensorFlow', 'PyTorch', 'Elasticsearch', 'Redis', 'RabbitMQ', 'Kafka',
      'Spring', 'Laravel', 'Django', 'Flask', 'Express', 'Next.js', 'Nuxt.js'
    ];
    
    const firstNames = [
      'Thomas', 'Emma', 'Hugo', 'Léa', 'Gabriel', 'Céline', 'Julien', 'Manon',
      'Antoine', 'Clara', 'Nicolas', 'Camille', 'Alexandre', 'Sarah', 'Rémi',
      'Aurélie', 'Vincent', 'Charlotte', 'Maxime', 'Julie'
    ];
    
    const lastNames = [
      'Bernard', 'Moreau', 'Robert', 'Simon', 'Durand', 'Lambert', 'Leroy', 'Roux',
      'Girard', 'Lefebvre', 'Bertrand', 'Richard', 'Morel', 'Petit', 'Fournier',
      'Garnier', 'Faure', 'Rousseau', 'Mercier', 'Blanc'
    ];
    
    const cities = [
      'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Nantes', 'Strasbourg',
      'Toulouse', 'Nice', 'Rennes', 'Montpellier', 'Grenoble', 'Angers', 'Dijon',
      'Reims', 'Le Havre', 'Aix-en-Provence', 'Saint-Étienne', 'Toulon', 'Annecy'
    ];
    
    const sectors = [
      'Banque & Finance', 'Assurance', 'Santé', 'Retail & E-commerce', 'Industrie',
      'Transport & Logistique', 'Énergie', 'Télécommunications', 'Média & Divertissement',
      'Services Publics', 'Luxe', 'Éducation', 'Agroalimentaire', 'Immobilier',
      'Technologie & Startups'
    ];
    
    // Générer 20 consultants
    for (let i = 0; i < 20; i++) {
      const randomSpecialty = specialties[Math.floor(Math.random() * specialties.length)];
      const randomTech1 = technologies[Math.floor(Math.random() * technologies.length)];
      const randomTech2 = technologies[Math.floor(Math.random() * technologies.length)];
      const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const randomCity1 = cities[Math.floor(Math.random() * cities.length)];
      const randomCity2 = cities[Math.floor(Math.random() * cities.length)];
      const randomSector1 = sectors[Math.floor(Math.random() * sectors.length)];
      const randomSector2 = sectors[Math.floor(Math.random() * sectors.length)];
      
      const skills: string[] = [];
      // Ajouter 3 à 6 compétences aléatoires
      const skillCount = Math.floor(Math.random() * 4) + 3;
      for (let j = 0; j < skillCount; j++) {
        const randomSkill = this.skillsList[Math.floor(Math.random() * this.skillsList.length)];
        if (!skills.includes(randomSkill)) {
          skills.push(randomSkill);
        }
      }
      
      const salary = (Math.floor(Math.random() * 40) + 50) * 10;
      const experienceLevels = ['junior', 'intermediate', 'senior', 'expert'] as const;
      const randomExperience = experienceLevels[Math.floor(Math.random() * experienceLevels.length)];
      const workModes = ['onsite', 'remote', 'hybrid'] as const;
      const randomWorkMode = workModes[Math.floor(Math.random() * workModes.length)];
      
      mockAvailabilities.push({
        id: `${7 + i}`,
        consultantId: `${107 + i}`,
        consultantName: `${randomFirstName} ${randomLastName}`,
        role: `Développeur ${randomSpecialty}`,
        consultantRole: `Développeur ${randomSpecialty}`,
        title: `${randomSpecialty === 'DevOps' || randomSpecialty === 'Cloud' || randomSpecialty === 'Security' ? 'Expert' : 'Senior'} ${randomSpecialty} ${randomTech1} / ${randomTech2}`,
        startDate: `2025-${(Math.floor(Math.random() * 3) + 4).toString().padStart(2, '0')}-${(Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0')}T00:00:00.000Z`,
        durationInMonths: Math.floor(Math.random() * 6) + 2,
        status: 'available',
        cities: [randomCity1, randomCity2].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
        workMode: randomWorkMode as 'onsite' | 'remote' | 'hybrid',
        rate: salary,
        skills: skills,
        description: `${randomSpecialty === 'UX/UI' ? 'Designer' : 'Développeur'} ${randomSpecialty} spécialisé en ${randomTech1} et ${randomTech2} avec une forte expérience dans le secteur ${randomSector1.toLowerCase()}.`,
        sectors: [randomSector1, randomSector2].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
        experienceLevel: randomExperience as 'junior' | 'intermediate' | 'senior' | 'expert',
        country: 'France',
        engagementType: Math.random() > 0.7 ? 'Salarié' : 'Freelance',
        locked: Math.random() > 0.7 // 30% des consultants sont verrouillés
      });
    }
    
    // Simuler un délai réseau pour montrer le loader
    setTimeout(() => {
      this.consultantAvailabilities = mockAvailabilities;
      this.loading = false;
      
      // Enregistrer dans la console pour le débogage
      console.log('Disponibilités chargées:', this.consultantAvailabilities);
    }, 500);
    
    // Note: Code laissé en commentaire pour être réactivé quand l'API sera prête
    /*
    this.consultantAvailabilityService.getAllAvailabilities().subscribe({
      next: (availabilities: ConsultantAvailability[]) => {
        this.consultantAvailabilities = availabilities;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des disponibilités', error);
        this.loading = false;
        this.error = true;
      }
    });
    */
  }
  
  /**
   * Ouvre le modal d'ajout (méthode temporairement gardée pour compatibilité)
   * Cette méthode sera modifiée dans une future étape
   */
  openAddAvailabilityModal(): void {
    // Cette méthode reste vide car le modal a été supprimé
    console.log('Cette fonctionnalité sera implémentée différemment dans une prochaine étape');
    // À l'avenir, cette méthode pourrait rediriger vers une nouvelle page ou ouvrir un formulaire différent
  }
  
  /**
   * Ancienne méthode de fermeture du modal (gardée pour référence)
   * @deprecated Cette méthode n'est plus utilisée
   */
  private closeAddAvailabilityModal(): void {
    // Méthode désactivée car le modal a été supprimé
    this.showAddModal = false;
  }
  
  /**
   * Ancienne méthode de gestion d'ajout (gardée pour référence)
   * @deprecated Cette méthode n'est plus utilisée
   */
  private onAvailabilityAdded(newAvailability: ConsultantAvailability): void {
    // Méthode désactivée car le modal a été supprimé
    this.loadAvailabilities();
  }
  
  viewAvailability(availability: ConsultantAvailability): void {
    // Cette méthode a été modifiée pour supporter la future implémentation
    console.log('Visualisation des détails', availability);
    // Mémoriser pour l'utilisateur que cette fonctionnalité sera mise à jour
    alert('Cette fonctionnalité sera implémentée différemment dans une prochaine étape');
  }
  
  // Commence l'édition directement dans la liste avec le formulaire collapsable
  editAvailability(availability: ConsultantAvailability): void {
    // Ferme tout autre formulaire d'édition qui pourrait être ouvert
    if (this.editingAvailabilityId && this.editingAvailabilityId !== availability.id) {
      this.cancelEditing();
    }
    
    // Active le mode édition pour cette disponibilité
    this.editingAvailabilityId = availability.id;
    
    // Petite pause pour permettre au DOM de se mettre à jour avant de faire défiler
    setTimeout(() => {
      // Trouve l'élément du formulaire d'édition et le rend visible dans la zone de défilement
      const editForm = document.querySelector(`.edit-form-collapsable[data-id="${availability.id}"]`) || 
                      document.querySelector(`.consultant-item.editing`);
      
      if (editForm) {
        editForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
    
    // Initialise le formulaire avec les valeurs actuelles
    this.editForm = new FormGroup({
      // Informations privées
      consultantName: new FormControl(availability.consultantName, Validators.required),
      consultantEmail: new FormControl(availability.consultantEmail || ''),
      consultantPhone: new FormControl(availability.consultantPhone || ''),
      acronym: new FormControl(availability.acronym || ''),
      internalId: new FormControl(availability.internalId || ''),
      
      // Informations publiques
      consultantAbbreviation: new FormControl(availability.consultantAbbreviation || ''),
      title: new FormControl(availability.title || ''),  // Nouveau champ pour le titre actuel
      role: new FormControl(availability.role || '', Validators.required),
      roles: new FormControl([]),  // Nouveau champ pour la multi-sélection des rôles
      startDate: new FormControl(this.formatDateForInput(availability.startDate), Validators.required),
      // Le champ durationInMonths ne sera plus requis par défaut
      durationInMonths: new FormControl(availability.durationInMonths || 0),
      status: new FormControl(availability.status, Validators.required),
      workMode: new FormControl(availability.workMode, Validators.required),
      workModes: new FormControl([]),  // Nouveau champ pour la multi-sélection des modes de travail
      experienceLevel: new FormControl(availability.experienceLevel || 'intermediate', Validators.required),
      rate: new FormControl(availability.rate || 0),
      salary: new FormControl(availability.salary || 0),
      
      // Coordonnées et liens
      linkedinUrl: new FormControl(availability.linkedinUrl || ''),
      cvUrl: new FormControl(availability.cvUrl || ''),
      cvType: new FormControl(availability.cvType || 'linkedin'),
      cvFileName: new FormControl(availability.cvFileName || ''),
      recruiterMessage: new FormControl(availability.recruiterMessage || ''),
      
      // Autres paramètres
      description: new FormControl(availability.description || ''),
      country: new FormControl(availability.country || 'France', Validators.required),
      engagementType: new FormControl(''),  // Champ conservé pour compatibilité mais non utilisé
      engagementTypes: new FormControl([]),  // Nouveau champ pour la multi-sélection
      locked: new FormControl(availability.locked || false)
    });
    
    // Initialise les rôles multi-sélectionnables
    if (Array.isArray(availability.roles) && availability.roles.length > 0) {
      // Si roles est déjà un tableau, l'utiliser directement
      this.editForm.patchValue({ roles: availability.roles });
    } else if (availability.role) {
      // Sinon, convertir la valeur unique role en tableau pour le nouveau champ roles
      this.editForm.patchValue({ roles: [availability.role] });
    } else {
      this.editForm.patchValue({ roles: [] });
    }
    
    // Initialise les types d'engagement à partir de la valeur unique
    if (availability.engagementType) {
      // Convertit une valeur unique en tableau pour le nouveau champ
      this.editForm.patchValue({ 
        engagementTypes: [availability.engagementType]
      });
    }
    
    // Initialise les modes de travail à partir de la valeur unique
    if (availability.workMode) {
      // Convertit une valeur unique en tableau pour le nouveau champ
      const workModeLabel = this.getWorkModeLabel(availability.workMode);
      this.editForm.patchValue({ 
        workModes: [workModeLabel]
      });
    }
    
    // Initialise les valeurs pour les champs de tags
    if (Array.isArray(availability.skills)) {
      this.editForm.patchValue({ skills: availability.skills });
    } else {
      this.editForm.patchValue({ skills: [] });
    }
    
    if (Array.isArray(availability.cities)) {
      this.editForm.patchValue({ cities: availability.cities });
    } else {
      this.editForm.patchValue({ cities: [] });
    }
    
    if (Array.isArray(availability.sectors)) {
      this.editForm.patchValue({ sectors: availability.sectors });
    } else {
      this.editForm.patchValue({ sectors: [] });
    }
    
    // Initialise les disponibles pour les dropdowns
    this.availableSkills = [...this.skillsList];
    this.availableSectors = [...this.sectors];
    this.updateAvailableCities();
  }
  
  // Annule le mode édition
  cancelEditing(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    this.editingAvailabilityId = null;
    this.editForm = null;
    this.skillsInput = '';
    this.citiesInput = '';
    this.sectorsInput = '';
    this.rolesInput = '';
    this.engagementTypeInput = '';
    this.workModesInput = '';
    
    // Fermer tous les dropdowns
    this.skillsDropdownOpen = false;
    this.citiesDropdownOpen = false;
    this.sectorsDropdownOpen = false;
    this.rolesDropdownOpen = false;
    this.engagementTypeDropdownOpen = false;
    this.workModesDropdownOpen = false;
  }
  
  // État des dropdowns pour le type d'engagement
  engagementTypeDropdownOpen: boolean = false;
  engagementTypeInput: string = '';
  
  // Méthodes pour les dropdowns
  
  /**
   * Ouvre/ferme le dropdown des compétences
   */
  toggleSkillsDropdown(event: Event): void {
    event.stopPropagation();
    this.skillsDropdownOpen = !this.skillsDropdownOpen;
    this.citiesDropdownOpen = false;
    this.sectorsDropdownOpen = false;
    this.engagementTypeDropdownOpen = false;
    this.workModesDropdownOpen = false;
  }
  
  /**
   * Ouvre/ferme le dropdown des villes
   */
  toggleCitiesDropdown(event: Event): void {
    event.stopPropagation();
    this.citiesDropdownOpen = !this.citiesDropdownOpen;
    this.skillsDropdownOpen = false;
    this.sectorsDropdownOpen = false;
    this.engagementTypeDropdownOpen = false;
    this.workModesDropdownOpen = false;
  }
  
  /**
   * Ouvre/ferme le dropdown des secteurs
   */
  toggleSectorsDropdown(event: Event): void {
    event.stopPropagation();
    this.sectorsDropdownOpen = !this.sectorsDropdownOpen;
    this.skillsDropdownOpen = false;
    this.citiesDropdownOpen = false;
    this.engagementTypeDropdownOpen = false;
    this.workModesDropdownOpen = false;
  }
  
  /**
   * Ouvre/ferme le dropdown des types d'engagement
   */
  toggleEngagementTypeDropdown(event: Event): void {
    event.stopPropagation();
    this.engagementTypeDropdownOpen = !this.engagementTypeDropdownOpen;
    this.skillsDropdownOpen = false;
    this.citiesDropdownOpen = false;
    this.sectorsDropdownOpen = false;
    this.workModesDropdownOpen = false;
  }
  
  /**
   * Met à jour la liste des villes disponibles
   */
  updateAvailableCities(): void {
    if (!this.editForm) return;
    
    const country = this.editForm.get('country')?.value;
    if (country && this.cities[country]) {
      this.availableCities = [...this.cities[country]];
    } else {
      this.availableCities = [];
    }
  }
  
  /**
   * Vérifie si une ville est sélectionnée
   */
  isCitySelected(city: string): boolean {
    if (!this.editForm) return false;
    
    const cities = this.editForm.get('cities')?.value || [];
    if (Array.isArray(cities)) {
      return cities.includes(city);
    }
    return false;
  }
  
  /**
   * Ajoute ou supprime une ville
   */
  toggleCity(city: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    if (!this.editForm) return;
    
    let cities = (this.editForm.get('cities')?.value || []) as string[];
    if (!Array.isArray(cities)) {
      cities = [];
    }
    
    const index = cities.indexOf(city);
    
    if (index === -1) {
      cities.push(city);
    } else {
      cities.splice(index, 1);
    }
    
    this.editForm.patchValue({ cities });
  }
  
  /**
   * Ajoute des compétences depuis l'input
   */
  addSkillsToForm(): void {
    if (!this.skillsInput.trim() || !this.editForm) return;
    
    const newSkill = this.skillsInput.trim();
    let skills = (this.editForm.get('skills')?.value || []) as string[];
    
    if (!Array.isArray(skills)) {
      skills = [];
    }
    
    if (newSkill && !skills.includes(newSkill)) {
      skills.push(newSkill);
      this.editForm.patchValue({ skills });
    }
    
    this.skillsInput = '';
  }
  
  /**
   * Ajoute des villes depuis l'input
   */
  addCitiesToForm(): void {
    if (!this.citiesInput.trim() || !this.editForm) return;
    
    const newCity = this.citiesInput.trim();
    let cities = (this.editForm.get('cities')?.value || []) as string[];
    
    if (!Array.isArray(cities)) {
      cities = [];
    }
    
    if (newCity && !cities.includes(newCity)) {
      cities.push(newCity);
      this.editForm.patchValue({ cities });
    }
    
    this.citiesInput = '';
  }
  
  /**
   * Ajoute des secteurs depuis l'input
   */
  addSectorsToForm(): void {
    if (!this.sectorsInput.trim() || !this.editForm) return;
    
    const newSector = this.sectorsInput.trim();
    let sectors = (this.editForm.get('sectors')?.value || []) as string[];
    
    if (!Array.isArray(sectors)) {
      sectors = [];
    }
    
    if (newSector && !sectors.includes(newSector)) {
      sectors.push(newSector);
      this.editForm.patchValue({ sectors });
    }
    
    this.sectorsInput = '';
  }
  
  /**
   * Supprime une compétence du formulaire
   */
  removeSkillFromForm(skill: string): void {
    if (!this.editForm) return;
    
    const skills = (this.editForm.get('skills')?.value || []) as string[];
    const index = skills.indexOf(skill);
    
    if (index !== -1) {
      skills.splice(index, 1);
      this.editForm.patchValue({ skills });
    }
  }
  
  /**
   * Supprime une ville du formulaire
   */
  removeCityFromForm(city: string): void {
    if (!this.editForm) return;
    
    const cities = (this.editForm.get('cities')?.value || []) as string[];
    const index = cities.indexOf(city);
    
    if (index !== -1) {
      cities.splice(index, 1);
      this.editForm.patchValue({ cities });
    }
  }
  
  /**
   * Supprime un secteur du formulaire
   */
  removeSectorFromForm(sector: string): void {
    if (!this.editForm) return;
    
    const sectors = (this.editForm.get('sectors')?.value || []) as string[];
    const index = sectors.indexOf(sector);
    
    if (index !== -1) {
      sectors.splice(index, 1);
      this.editForm.patchValue({ sectors });
    }
  }
  
  /**
   * Vérifie si un type d'engagement est sélectionné
   */
  isEngagementTypeSelected(type: string): boolean {
    if (!this.editForm) return false;
    
    const engagementTypes = this.editForm.get('engagementTypes')?.value || [];
    if (Array.isArray(engagementTypes)) {
      return engagementTypes.includes(type);
    }
    return false;
  }
  
  /**
   * Vérifie si le consultant est un salarié (pour afficher le champ salaire)
   */
  isSalarieEngagement(): boolean {
    if (!this.editForm) return false;
    
    const engagementTypes = this.editForm.get('engagementTypes')?.value || [];
    if (Array.isArray(engagementTypes)) {
      return engagementTypes.includes('Salarié');
    }
    return false;
  }
  
  /**
   * Vérifie si le consultant est un freelance (pour afficher le champ tjm)
   */
  isFreelanceEngagement(): boolean {
    if (!this.editForm) return false;
    
    const engagementTypes = this.editForm.get('engagementTypes')?.value || [];
    if (Array.isArray(engagementTypes)) {
      return engagementTypes.includes('Freelance') || engagementTypes.includes('Les deux');
    }
    return false;
  }
  
  /**
   * Ajoute ou supprime un type d'engagement
   */
  toggleEngagementType(type: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    if (!this.editForm) return;
    
    let engagementTypes = (this.editForm.get('engagementTypes')?.value || []) as string[];
    if (!Array.isArray(engagementTypes)) {
      engagementTypes = [];
    }
    
    const index = engagementTypes.indexOf(type);
    
    if (index === -1) {
      engagementTypes.push(type);
    } else {
      engagementTypes.splice(index, 1);
    }
    
    this.editForm.patchValue({ engagementTypes });
  }
  
  /**
   * Ajoute un type d'engagement depuis l'input
   */
  addEngagementTypeToForm(): void {
    if (!this.engagementTypeInput.trim() || !this.editForm) return;
    
    const newType = this.engagementTypeInput.trim();
    let engagementTypes = (this.editForm.get('engagementTypes')?.value || []) as string[];
    
    if (!Array.isArray(engagementTypes)) {
      engagementTypes = [];
    }
    
    if (newType && !engagementTypes.includes(newType)) {
      engagementTypes.push(newType);
      this.editForm.patchValue({ engagementTypes });
    }
    
    this.engagementTypeInput = '';
  }
  
  /**
   * Supprime un type d'engagement du formulaire
   */
  removeEngagementTypeFromForm(type: string): void {
    if (!this.editForm) return;
    
    const engagementTypes = (this.editForm.get('engagementTypes')?.value || []) as string[];
    const index = engagementTypes.indexOf(type);
    
    if (index !== -1) {
      engagementTypes.splice(index, 1);
      this.editForm.patchValue({ engagementTypes });
    }
  }
  
  /**
   * Ouvre/ferme le dropdown des modes de travail
   */
  toggleWorkModesDropdown(event: Event): void {
    event.stopPropagation();
    this.workModesDropdownOpen = !this.workModesDropdownOpen;
    this.skillsDropdownOpen = false;
    this.citiesDropdownOpen = false;
    this.sectorsDropdownOpen = false;
    this.rolesDropdownOpen = false;
    this.engagementTypeDropdownOpen = false;
  }
  
  /**
   * Ouvre/ferme le dropdown des rôles
   */
  toggleRolesDropdown(event: Event): void {
    event.stopPropagation();
    this.rolesDropdownOpen = !this.rolesDropdownOpen;
    this.skillsDropdownOpen = false;
    this.citiesDropdownOpen = false;
    this.sectorsDropdownOpen = false;
    this.engagementTypeDropdownOpen = false;
    this.workModesDropdownOpen = false;
  }
  
  /**
   * Vérifie si un rôle est sélectionné
   */
  isRoleSelected(role: string): boolean {
    if (!this.editForm) return false;
    
    const roles = this.editForm.get('roles')?.value || [];
    if (Array.isArray(roles)) {
      return roles.includes(role);
    }
    return false;
  }
  
  /**
   * Ajoute ou supprime un rôle
   */
  toggleRole(role: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    if (!this.editForm) return;
    
    let roles = (this.editForm.get('roles')?.value || []) as string[];
    if (!Array.isArray(roles)) {
      roles = [];
    }
    
    const index = roles.indexOf(role);
    
    if (index === -1) {
      roles.push(role);
    } else {
      roles.splice(index, 1);
    }
    
    this.editForm.patchValue({ roles });
    
    // Mise à jour du champ role (compatibilité)
    if (roles.length > 0) {
      this.editForm.patchValue({ role: roles[0] });
    }
  }
  
  /**
   * Ajoute un rôle depuis l'input
   */
  addRoleToForm(): void {
    if (!this.rolesInput.trim() || !this.editForm) return;
    
    const newRole = this.rolesInput.trim();
    let roles = (this.editForm.get('roles')?.value || []) as string[];
    
    if (!Array.isArray(roles)) {
      roles = [];
    }
    
    if (newRole && !roles.includes(newRole)) {
      roles.push(newRole);
      this.editForm.patchValue({ roles });
      
      // Mise à jour du champ role (compatibilité)
      if (roles.length === 1) {
        this.editForm.patchValue({ role: newRole });
      }
    }
    
    this.rolesInput = '';
  }
  
  /**
   * Supprime un rôle du formulaire
   */
  removeRoleFromForm(role: string): void {
    if (!this.editForm) return;
    
    const roles = (this.editForm.get('roles')?.value || []) as string[];
    const index = roles.indexOf(role);
    
    if (index !== -1) {
      roles.splice(index, 1);
      this.editForm.patchValue({ roles });
      
      // Mise à jour du champ role (compatibilité)
      if (roles.length > 0) {
        this.editForm.patchValue({ role: roles[0] });
      } else {
        this.editForm.patchValue({ role: '' });
      }
    }
  }
  
  /**
   * Vérifie si un mode de travail est sélectionné
   */
  isWorkModeSelected(mode: string): boolean {
    if (!this.editForm) return false;
    
    const workModes = this.editForm.get('workModes')?.value || [];
    if (Array.isArray(workModes)) {
      return workModes.includes(mode);
    }
    return false;
  }
  
  /**
   * Ajoute ou supprime un mode de travail
   */
  toggleWorkMode(mode: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    if (!this.editForm) return;
    
    let workModes = (this.editForm.get('workModes')?.value || []) as string[];
    if (!Array.isArray(workModes)) {
      workModes = [];
    }
    
    const index = workModes.indexOf(mode);
    
    if (index === -1) {
      workModes.push(mode);
    } else {
      workModes.splice(index, 1);
    }
    
    this.editForm.patchValue({ workModes });
    
    // Mise à jour du champ workMode (compatibilité)
    if (workModes.length > 0) {
      this.editForm.patchValue({ workMode: this.convertWorkMode(workModes[0]) });
    }
  }
  
  /**
   * Ajoute un mode de travail depuis l'input
   */
  addWorkModeToForm(): void {
    if (!this.workModesInput.trim() || !this.editForm) return;
    
    const newMode = this.workModesInput.trim();
    let workModes = (this.editForm.get('workModes')?.value || []) as string[];
    
    if (!Array.isArray(workModes)) {
      workModes = [];
    }
    
    if (newMode && !workModes.includes(newMode)) {
      workModes.push(newMode);
      this.editForm.patchValue({ workModes });
      
      // Mise à jour du champ workMode (compatibilité)
      if (workModes.length === 1) {
        this.editForm.patchValue({ workMode: this.convertWorkMode(newMode) });
      }
    }
    
    this.workModesInput = '';
  }
  
  /**
   * Supprime un mode de travail du formulaire
   */
  removeWorkModeFromForm(mode: string): void {
    if (!this.editForm) return;
    
    const workModes = (this.editForm.get('workModes')?.value || []) as string[];
    const index = workModes.indexOf(mode);
    
    if (index !== -1) {
      workModes.splice(index, 1);
      this.editForm.patchValue({ workModes });
      
      // Mise à jour du champ workMode (compatibilité)
      if (workModes.length > 0) {
        this.editForm.patchValue({ workMode: this.convertWorkMode(workModes[0]) });
      } else {
        this.editForm.patchValue({ workMode: 'remote' }); // Valeur par défaut
      }
    }
  }
  
  /**
   * Change le type de CV (LinkedIn, URL externe, fichier)
   */
  changeCvType(type: string): void {
    if (!this.editForm) return;
    
    this.editForm.patchValue({ cvType: type });
    
    // Réinitialiser les champs selon le type de CV sélectionné
    if (type === 'linkedin') {
      // Garder uniquement l'URL LinkedIn
      this.editForm.patchValue({ cvFileName: '', cvUrl: '' });
      this.selectedCvFile = null;
    } else if (type === 'url') {
      // Garder uniquement l'URL du CV externe
      this.editForm.patchValue({ linkedinUrl: '', cvFileName: '' });
      this.selectedCvFile = null;
    } else if (type === 'file') {
      // Garder uniquement le nom du fichier CV uploadé
      this.editForm.patchValue({ linkedinUrl: '', cvUrl: '' });
    }
  }
  
  /**
   * Gère le téléchargement du fichier CV
   * @param event L'événement de changement de fichier
   */
  handleCvFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files.length || !this.editForm) return;
    
    const file = input.files[0];
    
    // Vérifier le type de fichier (accepter uniquement les PDF)
    if (file.type !== 'application/pdf') {
      alert('Veuillez sélectionner un fichier PDF');
      return;
    }
    
    // Vérifier la taille du fichier (max 5 MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSizeInBytes) {
      alert('La taille du fichier ne doit pas dépasser 5 MB');
      return;
    }
    
    // Stocker le fichier pour l'upload ultérieur
    this.selectedCvFile = file;
    
    // Mettre à jour le nom du fichier dans le formulaire
    this.editForm.patchValue({ cvFileName: file.name });
    
    console.log('Fichier CV sélectionné:', file.name);
  }
  
  /**
   * Convertit un libellé de mode de travail en valeur compatible avec l'API
   */
  convertWorkMode(label: string): string {
    switch(label) {
      case 'Sur site':
        return 'onsite';
      case 'Télétravail':
        return 'remote';
      case 'Hybride':
        return 'hybrid';
      case 'Flexible':
        return 'flexible';
      default:
        // Si le libellé ne correspond pas, on conserve le texte tel quel
        return label.toLowerCase().replace(/\s+/g, '_');
    }
  }
  
  // Sauvegarde les modifications
  saveAvailability(availabilityId: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    if (!this.editForm || !this.editForm.valid) {
      return;
    }
    
    // Récupère la disponibilité originale
    const originalAvailability = this.consultantAvailabilities.find(a => a.id === availabilityId);
    if (!originalAvailability) {
      return;
    }
    
    // Crée une nouvelle disponibilité avec les valeurs du formulaire
    const formValues = this.editForm.value;
    const updatedAvailability: ConsultantAvailability = {
      ...originalAvailability,
      ...formValues,
      // Assure que les tableaux sont bien initialisés
      skills: Array.isArray(formValues.skills) ? formValues.skills : [],
      cities: Array.isArray(formValues.cities) ? formValues.cities : [],
      sectors: Array.isArray(formValues.sectors) ? formValues.sectors : [],
      roles: Array.isArray(formValues.roles) ? formValues.roles : [],
      // Utilise le premier type d'engagement du tableau pour le champ ancien format
      engagementType: Array.isArray(formValues.engagementTypes) && formValues.engagementTypes.length > 0 
        ? formValues.engagementTypes[0] 
        : 'Freelance',
      // Utilise le premier mode de travail du tableau pour le champ workMode (compatibilité API)
      workMode: Array.isArray(formValues.workModes) && formValues.workModes.length > 0 
        ? this.convertWorkMode(formValues.workModes[0]) 
        : 'remote',
      // Utilise le premier rôle du tableau pour le champ role (compatibilité API)
      role: Array.isArray(formValues.roles) && formValues.roles.length > 0 
        ? formValues.roles[0] 
        : (formValues.role || ''),
      // Formatage de la date
      startDate: new Date(formValues.startDate).toISOString()
    };
    
    // Si un fichier CV a été sélectionné, l'uploader d'abord
    if (this.selectedCvFile && formValues.cvType === 'file') {
      console.log('Préparation à l\'upload du fichier CV:', this.selectedCvFile.name);
      
      // Dans une application réelle, on utiliserait FormData pour l'upload
      const formData = new FormData();
      formData.append('cvFile', this.selectedCvFile);
      formData.append('consultantId', updatedAvailability.consultantId);
      
      // Simuler l'upload pour le prototype
      // Note: Dans une implémentation réelle, on enverrait formData au serveur
      console.log('Simulation de l\'upload du fichier CV...');
      
      // Pour le prototype, on met simplement à jour la référence au fichier
      // Le serveur stockerait normalement le fichier et renverrait son URL
      setTimeout(() => {
        console.log('Fichier CV uploadé avec succès (simulé)');
        
        // Mise à jour de la disponibilité avec le nom du fichier CV
        this.consultantAvailabilityService.updateAvailability(availabilityId, updatedAvailability).subscribe({
          next: () => {
            this.selectedCvFile = null; // Réinitialisation après sauvegarde
            this.cancelEditing();
            this.loadAvailabilities();
          },
          error: (error: any) => {
            console.error('Erreur lors de la mise à jour de la disponibilité', error);
          }
        });
      }, 500);
    } else {
      // Pas de fichier à uploader, mise à jour directe de la disponibilité
      this.consultantAvailabilityService.updateAvailability(availabilityId, updatedAvailability).subscribe({
        next: () => {
          this.cancelEditing();
          this.loadAvailabilities();
        },
        error: (error: any) => {
          console.error('Erreur lors de la mise à jour de la disponibilité', error);
        }
      });
    }
  }
  
  // Formatte une date pour l'affichage dans un input type date
  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
  
  deleteAvailability(availability: ConsultantAvailability | null, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    if (!availability) {
      console.error('Impossible de supprimer une disponibilité non définie');
      return;
    }
    
    this.consultantAvailabilityService.deleteAvailability(availability.id).subscribe({
      next: () => {
        // Recharger les disponibilités après la suppression
        this.loadAvailabilities();
        // Fermer le modal de confirmation
        this.showDeleteConfirmationModal = false;
        this.availabilityToDelete = null;
      },
      error: (error: any) => {
        console.error('Erreur lors de la suppression de la disponibilité', error);
      }
    });
  }
  
  // Pour arrêter la propagation des événements de clic
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }
  
  getStatusLabel(status: string): string {
    switch(status) {
      case 'available':
        return 'Disponible';
      case 'pending':
        return 'En attente';
      case 'inactive':
        return 'Inactive';
      default:
        return status;
    }
  }
  
  getWorkModeLabel(workMode: string): string {
    switch(workMode) {
      case 'onsite':
        return 'Sur site';
      case 'remote':
        return 'Télétravail';
      case 'hybrid':
        return 'Hybride';
      default:
        return workMode;
    }
  }
  
  /**
   * Retourne le libellé d'expérience basé sur le niveau
   */
  getExperienceLabel(experienceLevel: string | undefined): string {
    if (!experienceLevel) return '0-5 ans'; // Valeur par défaut
    
    switch(experienceLevel) {
      case 'junior':
        return '0-5 ans';
      case 'intermediate':
        return '5-10 ans';
      case 'senior':
        return '10+ ans';
      case 'expert':
        return '15+ ans';
      default:
        return '5-10 ans'; // Valeur par défaut pour l'affichage
    }
  }
  
  /**
   * Convertit un tableau de compétences en chaîne lisible
   */
  getSkillsString(skills: string[] | undefined): string {
    if (!skills || skills.length === 0) return 'C#, Angular +1'; // Valeur par défaut pour correspondre à l'exemple
    
    // Si nous avons plus de 2 compétences, on affiche les 2 premières suivies de "+X"
    if (skills.length > 2) {
      return `${skills.slice(0, 2).join(', ')} +${skills.length - 2}`;
    }
    
    return skills.join(', ');
  }
  
  /**
   * Vérifie si une compétence est sélectionnée
   */
  isSkillSelected(skill: string): boolean {
    if (!this.editForm) return false;
    
    const skills = this.editForm.get('skills')?.value || [];
    if (Array.isArray(skills)) {
      return skills.includes(skill);
    }
    return false;
  }
  
  /**
   * Ajoute ou supprime une compétence
   */
  toggleSkill(skill: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    if (!this.editForm) return;
    
    let skills = (this.editForm.get('skills')?.value || []) as string[];
    if (!Array.isArray(skills)) {
      skills = [];
    }
    
    const index = skills.indexOf(skill);
    
    if (index === -1) {
      skills.push(skill);
    } else {
      skills.splice(index, 1);
    }
    
    this.editForm.patchValue({ skills });
  }
  
  /**
   * Récupère les villes disponibles pour un pays
   */
  getAvailableCities(country: string): string[] {
    return this.cities[country] || [];
  }
  
  /**
   * Vérifie si une expertise est sélectionnée
   */
  isExpertiseSelected(expertise: string): boolean {
    if (!this.editForm) return false;
    
    const sectors = this.editForm.get('sectors')?.value || [];
    if (Array.isArray(sectors)) {
      return sectors.includes(expertise);
    }
    return false;
  }
  
  /**
   * Ajoute ou supprime une expertise (alias pour toggleSector)
   */
  toggleExpertise(expertise: string, event?: Event): void {
    // Réutilise toggleSector car les expertises sont stockées dans le même champ
    this.toggleSector(expertise, event);
  }
  
  /**
   * Vérifie si un secteur est sélectionné
   */
  isSectorSelected(sector: string): boolean {
    if (!this.editForm) return false;
    
    const sectors = this.editForm.get('sectors')?.value || [];
    if (Array.isArray(sectors)) {
      return sectors.includes(sector);
    }
    return false;
  }
  
  /**
   * Ajoute ou supprime un secteur
   */
  toggleSector(sector: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    if (!this.editForm) return;
    
    let sectors = (this.editForm.get('sectors')?.value || []) as string[];
    if (!Array.isArray(sectors)) {
      sectors = [];
    }
    
    const index = sectors.indexOf(sector);
    
    if (index === -1) {
      sectors.push(sector);
    } else {
      sectors.splice(index, 1);
    }
    
    this.editForm.patchValue({ sectors });
  }
}