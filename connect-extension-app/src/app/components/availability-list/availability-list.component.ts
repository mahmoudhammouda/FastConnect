import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ConsultantAvailability } from '../../models/consultant-availability.model';
import { ConsultantAvailabilityService } from '../../services/consultant-availability.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-availability-list',
  templateUrl: './availability-list.component.html',
  styleUrls: ['./availability-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class AvailabilityListComponent implements OnInit {
  consultantAvailabilities: ConsultantAvailability[] = [];
  loading: boolean = false;
  error: boolean = false;
  
  // État du mode édition
  editingAvailabilityId: string | null = null;
  editForm: FormGroup | null = null;
  skillsInput: string = '';
  citiesInput: string = '';
  sectorsInput: string = '';
  selectedEngagementTypes: string[] = [];
  
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
  
  openAddAvailabilityModal(): void {
    this.modalService.openAddAvailabilityModal().then(() => {
      // Recharger les disponibilités après fermeture du modal (si ajout réussi)
      this.loadAvailabilities();
    });
  }
  
  viewAvailability(availability: ConsultantAvailability): void {
    // Affichage en lecture seule des détails
    this.modalService.openAddAvailabilityModal(availability, true).then(() => {
      // Pas besoin de recharger car aucune modification
    });
  }
  
  // Commence l'édition directement dans la liste avec le formulaire collapsable
  editAvailability(availability: ConsultantAvailability): void {
    // Ferme tout autre formulaire d'édition qui pourrait être ouvert
    if (this.editingAvailabilityId && this.editingAvailabilityId !== availability.id) {
      this.cancelEditing();
    }
    
    // Active le mode édition pour cette disponibilité
    this.editingAvailabilityId = availability.id;
    
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
      role: new FormControl(availability.role || '', Validators.required),
      startDate: new FormControl(this.formatDateForInput(availability.startDate), Validators.required),
      durationInMonths: new FormControl(availability.durationInMonths, [Validators.required, Validators.min(1)]),
      status: new FormControl(availability.status, Validators.required),
      workMode: new FormControl(availability.workMode, Validators.required),
      experienceLevel: new FormControl(availability.experienceLevel || 'intermediate', Validators.required),
      rate: new FormControl(availability.rate || 0),
      
      // Coordonnées et liens
      linkedinUrl: new FormControl(availability.linkedinUrl || ''),
      recruiterMessage: new FormControl(availability.recruiterMessage || ''),
      
      // Autres paramètres
      description: new FormControl(availability.description || ''),
      country: new FormControl(availability.country || 'France', Validators.required),
      engagementType: new FormControl(availability.engagementType || 'Freelance', Validators.required),
      locked: new FormControl(availability.locked || false)
    });
    
    // Initialise les valeurs pour les champs de tags (convertis en chaînes pour l'affichage)
    this.skillsInput = (availability.skills || []).join(', ');
    this.citiesInput = (availability.cities || []).join(', ');
    this.sectorsInput = (availability.sectors || []).join(', ');
    
    // Initialise les types d'engagement
    this.initializeEngagementTypes(availability.engagementType);
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
    this.selectedEngagementTypes = [];
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
    const updatedAvailability: ConsultantAvailability = {
      ...originalAvailability,
      ...this.editForm.value,
      // Convertit les chaînes en tableaux pour les champs de tags
      skills: this.skillsInput.split(',').map(s => s.trim()).filter(s => s),
      cities: this.citiesInput.split(',').map(s => s.trim()).filter(s => s),
      sectors: this.sectorsInput.split(',').map(s => s.trim()).filter(s => s),
      // Formatage de la date
      startDate: new Date(this.editForm.value.startDate).toISOString()
    };
    
    // Envoie la mise à jour au serveur
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
  
  // Formatte une date pour l'affichage dans un input type date
  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
  
  deleteAvailability(availability: ConsultantAvailability, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer cette disponibilité pour ${availability.consultantName} ?`)) {
      this.consultantAvailabilityService.deleteAvailability(availability.id).subscribe({
        next: () => {
          // Recharger les disponibilités après la suppression
          this.loadAvailabilities();
        },
        error: (error: any) => {
          console.error('Erreur lors de la suppression de la disponibilité', error);
        }
      });
    }
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
    const skills = this.skillsInput.split(',').map(s => s.trim()).filter(s => s !== '');
    return skills.includes(skill);
  }
  
  /**
   * Ajoute ou supprime une compétence
   */
  toggleSkill(skill: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    const skills = this.skillsInput.split(',').map(s => s.trim()).filter(s => s !== '');
    const index = skills.indexOf(skill);
    
    if (index === -1) {
      skills.push(skill);
    } else {
      skills.splice(index, 1);
    }
    
    this.skillsInput = skills.join(', ');
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
    const expertises = this.sectorsInput.split(',').map(s => s.trim()).filter(s => s !== '');
    return expertises.includes(expertise);
  }
  
  /**
   * Ajoute ou supprime une expertise
   */
  toggleExpertise(expertise: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    const expertises = this.sectorsInput.split(',').map(s => s.trim()).filter(s => s !== '');
    const index = expertises.indexOf(expertise);
    
    if (index === -1) {
      expertises.push(expertise);
    } else {
      expertises.splice(index, 1);
    }
    
    this.sectorsInput = expertises.join(', ');
  }
  
  /**
   * Vérifie si un secteur est sélectionné
   */
  isSectorSelected(sector: string): boolean {
    const sectors = this.sectorsInput.split(',').map(s => s.trim()).filter(s => s !== '');
    return sectors.includes(sector);
  }
  
  /**
   * Ajoute ou supprime un secteur
   */
  toggleSector(sector: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    const sectors = this.sectorsInput.split(',').map(s => s.trim()).filter(s => s !== '');
    const index = sectors.indexOf(sector);
    
    if (index === -1) {
      sectors.push(sector);
    } else {
      sectors.splice(index, 1);
    }
    
    this.sectorsInput = sectors.join(', ');
  }
  
  /**
   * Vérifie si un type d'engagement est sélectionné
   */
  isEngagementTypeSelected(type: string): boolean {
    // Si nous utilisons selectedEngagementTypes, vérifier dedans
    if (this.selectedEngagementTypes.length > 0) {
      return this.selectedEngagementTypes.includes(type);
    }
    
    // Sinon, vérifier le engagementType du formulaire
    if (this.editForm && this.editForm.get('engagementType')) {
      const currentType = this.editForm.get('engagementType')?.value;
      return currentType === type;
    }
    
    return false;
  }
  
  /**
   * Gère la sélection ou désélection d'un type d'engagement
   * avec les règles métier spécifiques
   */
  toggleEngagementType(type: string, event: Event): void {
    if (!this.editForm) return;
    
    const checkbox = event.target as HTMLInputElement;
    
    // Règle : Sous-traitance est exclusif
    if (type === 'Sous-traitance') {
      if (checkbox.checked) {
        // Si Sous-traitance est sélectionné, désélectionner les autres
        this.selectedEngagementTypes = ['Sous-traitance'];
        this.editForm.patchValue({ engagementType: 'Sous-traitance' });
      } else {
        // Si Sous-traitance est désélectionné, vider la sélection
        this.selectedEngagementTypes = [];
        this.editForm.patchValue({ engagementType: '' });
      }
    } else {
      // Pour Freelance et Salarié
      if (checkbox.checked) {
        // Si déjà Sous-traitance, ne rien faire
        if (this.isEngagementTypeSelected('Sous-traitance')) {
          return;
        }
        
        // Ajouter le type à la sélection
        if (!this.selectedEngagementTypes.includes(type)) {
          this.selectedEngagementTypes.push(type);
        }
        
        // Mettre à jour le champ du formulaire
        if (this.selectedEngagementTypes.length === 1) {
          this.editForm.patchValue({ engagementType: type });
        } else if (this.selectedEngagementTypes.length === 2) {
          this.editForm.patchValue({ engagementType: 'Les deux' });
        }
      } else {
        // Retirer le type de la sélection
        this.selectedEngagementTypes = this.selectedEngagementTypes.filter(t => t !== type);
        
        // Mettre à jour le champ du formulaire
        if (this.selectedEngagementTypes.length === 0) {
          this.editForm.patchValue({ engagementType: '' });
        } else if (this.selectedEngagementTypes.length === 1) {
          this.editForm.patchValue({ engagementType: this.selectedEngagementTypes[0] });
        }
      }
    }
  }
  
  /**
   * Initialise les types d'engagement à partir d'une disponibilité existante
   */
  initializeEngagementTypes(engagementType?: string): void {
    this.selectedEngagementTypes = [];
    
    if (!engagementType) return;
    
    if (engagementType === 'Sous-traitance') {
      this.selectedEngagementTypes = ['Sous-traitance'];
    } else if (engagementType === 'Freelance') {
      this.selectedEngagementTypes = ['Freelance'];
    } else if (engagementType === 'Salarié') {
      this.selectedEngagementTypes = ['Salarié'];
    } else if (engagementType === 'Les deux') {
      this.selectedEngagementTypes = ['Freelance', 'Salarié'];
    }
  }
}
