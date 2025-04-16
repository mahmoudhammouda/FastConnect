import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { ConsultantAvailabilityService } from '../../services/consultant-availability.service';
import { ConsultantAvailability } from '../../models/consultant-availability.model';
import { AvailabilityStatus } from '../../models/consultant.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-availability-modal',
  templateUrl: './add-availability-modal.component.html',
  styleUrls: ['./add-availability-modal.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class AddAvailabilityModalComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ConsultantAvailability>();

  availabilityForm: FormGroup;
  isSubmitting = false;
  submitError: string | null = null;
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
  selectedCountry: string = '';
  availableCities: string[] = [];
  selectedCities: string[] = [];
  citiesDropdownOpen: boolean = false;
  sectorsDropdownOpen: boolean = false;
  expertisesDropdownOpen: boolean = false;
  skillsDropdownOpen: boolean = false;
  experienceOptions = [
    { value: 'junior', label: 'Junior (1-3 ans)' },
    { value: 'intermediaire', label: 'Intermédiaire (3-5 ans)' },
    { value: 'senior', label: 'Senior (5-8 ans)' },
    { value: 'expert', label: 'Expert (8+ ans)' }
  ];
  availabilityOptions = [
    { value: 0, label: 'Disponible maintenant' },
    { value: 1, label: 'Bientôt disponible (< 1 mois)' },
    { value: 2, label: 'Non disponible' }
  ];
  skillsList = [
    'JavaScript', 'TypeScript', 'Angular', 'React', 'Vue.js', 'Node.js', 'PHP', 'Laravel', 
    'Symfony', 'Python', 'Django', 'Flask', 'Ruby', 'Ruby on Rails', '.NET', 'C#', 'Java', 
    'Spring', 'Kotlin', 'Swift', 'iOS', 'Android', 'React Native', 'Flutter', 'AWS', 
    'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'DevOps', 'SQL', 'NoSQL', 'MongoDB', 
    'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'GraphQL', 'REST API', 'Microservices', 
    'Architecture', 'Agile', 'Scrum', 'Product Owner', 'UX/UI', 'Figma', 'Adobe XD'
  ];
  roleOptions = [
    'Développeur Full-Stack', 'Développeur Front-End', 'Développeur Back-End', 
    'Développeur Mobile', 'Développeur .NET', 'Développeur Java', 'Développeur PHP', 
    'Développeur Python', 'DevOps Engineer', 'Data Scientist', 'Data Engineer', 
    'SRE Engineer', 'UX/UI Designer', 'Product Owner', 'Scrum Master', 'Chef de Projet', 
    'Architecte Logiciel', 'Tech Lead', 'QA Engineer', 'Business Analyst'
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
  
  // Options pour les nouveaux champs
  engagementTypes = ['Freelance', 'Salarié', 'Les deux'];
  workModes = ['Full Remote', 'Hybride', 'Sur Site'];
  workModesDropdownOpen: boolean = false;
  selectedWorkModes: string[] = [];
  
  // État de l'éditeur de texte
  isBold = false;
  isItalic = false;
  isUnderline = false;
  textAlignment = 'left';

  constructor(
    private fb: FormBuilder,
    public modalService: ModalService,
    private availabilityService: ConsultantAvailabilityService
  ) {
    this.availabilityForm = this.fb.group({
      role: ['', Validators.required],
      experienceLevel: ['', Validators.required],
      abbreviation: ['', [Validators.required, Validators.maxLength(10)]],
      country: ['', Validators.required],
      cities: [[], Validators.required],
      availabilityStatus: ['', Validators.required],
      locked: [false],
      linkedinUrl: [''],
      recruiterMessage: [''],
      engagementType: ['', Validators.required],
      workModes: [[], Validators.required],
      skills: [[]],
      selectedSectors: [[]],
      selectedExpertises: [[]],
      tjm: ['', [Validators.min(0), Validators.pattern('^[0-9]*$')]],
      salary: ['', [Validators.min(0), Validators.pattern('^[0-9]*$')]],
      notes: [''],
      isSubcontractor: [false],
      subcontractorProfiles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Enregistrement du modal auprès du service
    this.modalService.register('add-availability-modal', {
      open: this.openModal.bind(this),
      close: this.closeModal.bind(this)
    });
    
    // Initialisation
    this.availabilityForm.get('country')?.valueChanges.subscribe(country => {
      this.selectedCountry = country;
      this.availableCities = this.cities[country] || [];
      this.selectedCities = [];
      this.availabilityForm.get('cities')?.setValue([]);
    });
    
    // S'abonner aux changements dans les villes sélectionnées
    this.availabilityForm.get('cities')?.valueChanges.subscribe(cities => {
      this.selectedCities = cities || [];
    });
    
    // S'abonner aux changements de type d'engagement
    this.availabilityForm.get('engagementType')?.valueChanges.subscribe(engagementType => {
      // Si l'engagement est de type "Salarié", le champ salaire est actif et le TJM est grisé
      if (engagementType === 'Salarié') {
        // Ajouter les validateurs pour salary
        this.availabilityForm.get('salary')?.setValidators([Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]);
        this.availabilityForm.get('salary')?.updateValueAndValidity();
        
        // Pour le TJM, on garde la valeur mais on retire les validateurs required
        this.availabilityForm.get('tjm')?.clearValidators();
        // On ajoute quand même les validateurs de format, mais pas required
        this.availabilityForm.get('tjm')?.setValidators([Validators.min(0), Validators.pattern('^[0-9]*$')]);
        this.availabilityForm.get('tjm')?.updateValueAndValidity();
      } 
      // Si l'engagement est Freelance ou Les deux, le TJM est actif et le salaire est grisé
      else if (engagementType === 'Freelance' || engagementType === 'Les deux') {
        // Ajouter les validateurs pour tjm
        this.availabilityForm.get('tjm')?.setValidators([Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]);
        this.availabilityForm.get('tjm')?.updateValueAndValidity();
        
        // Pour le salaire, on garde la valeur mais on retire les validateurs required
        this.availabilityForm.get('salary')?.clearValidators();
        // On ajoute quand même les validateurs de format, mais pas required
        this.availabilityForm.get('salary')?.setValidators([Validators.min(0), Validators.pattern('^[0-9]*$')]);
        this.availabilityForm.get('salary')?.updateValueAndValidity();
      }
      // Si aucun type n'est sélectionné, on retire tous les validateurs required
      else {
        // On ajoute quand même les validateurs de format, mais pas required
        this.availabilityForm.get('tjm')?.setValidators([Validators.min(0), Validators.pattern('^[0-9]*$')]);
        this.availabilityForm.get('tjm')?.updateValueAndValidity();
        
        this.availabilityForm.get('salary')?.setValidators([Validators.min(0), Validators.pattern('^[0-9]*$')]);
        this.availabilityForm.get('salary')?.updateValueAndValidity();
      }
    });
  }
  
  openModal(): void {
    // Afficher le modal
    const modalElement = document.querySelector('.add-availability-modal') as HTMLElement;
    if (modalElement) {
      modalElement.classList.remove('hidden');
      modalElement.classList.add('flex');
    }
  }
  

  get subcontractorProfiles() {
    return this.availabilityForm.get('subcontractorProfiles') as FormArray;
  }

  addSubcontractorProfile() {
    const profileGroup = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      experienceLevel: ['', Validators.required],
      tjm: ['', [Validators.min(0), Validators.pattern('^[0-9]*$')]],
      skills: [[]]
    });

    this.subcontractorProfiles.push(profileGroup);
  }

  removeSubcontractorProfile(index: number) {
    this.subcontractorProfiles.removeAt(index);
  }

  // Méthodes pour les compétences
  addSkill(skill: string) {
    if (!skill || skill.trim() === '') return;
    
    const skills = this.availabilityForm.get('skills')?.value || [];
    if (!skills.includes(skill.trim())) {
      skills.push(skill.trim());
      this.availabilityForm.get('skills')?.setValue(skills);
    }
  }

  addSkillFromSelect(skill: string) {
    if (!skill) return;
    this.addSkill(skill);
  }

  removeSkill(skill: string) {
    const skills = this.availabilityForm.get('skills')?.value || [];
    const updatedSkills = skills.filter((s: string) => s !== skill);
    this.availabilityForm.get('skills')?.setValue(updatedSkills);
  }
  
  // Méthodes pour le dropdown des compétences
  toggleSkillsDropdown(event: Event): void {
    event.stopPropagation();
    this.skillsDropdownOpen = !this.skillsDropdownOpen;
    
    // Fermer les autres dropdowns
    this.citiesDropdownOpen = false;
    this.sectorsDropdownOpen = false;
    this.expertisesDropdownOpen = false;
    
    // Fermer le dropdown lorsqu'on clique ailleurs sur la page
    if (this.skillsDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeSkillsDropdown);
      }, 0);
    }
  }

  closeSkillsDropdown = () => {
    this.skillsDropdownOpen = false;
    document.removeEventListener('click', this.closeSkillsDropdown);
  }
  
  isSkillSelected(skill: string): boolean {
    const skills = this.availabilityForm.get('skills')?.value || [];
    return skills.includes(skill);
  }
  
  toggleSkill(skill: string): void {
    const skills = this.availabilityForm.get('skills')?.value || [];
    const index = skills.indexOf(skill);
    
    if (index === -1) {
      skills.push(skill);
    } else {
      skills.splice(index, 1);
    }
    
    this.availabilityForm.get('skills')?.setValue(skills);
  }

  // Méthodes pour les secteurs d'activité
  toggleSector(sector: string) {
    const sectors = this.availabilityForm.get('selectedSectors')?.value || [];
    const index = sectors.indexOf(sector);
    
    if (index === -1) {
      sectors.push(sector);
    } else {
      sectors.splice(index, 1);
    }
    
    this.availabilityForm.get('selectedSectors')?.setValue(sectors);
  }

  isSectorSelected(sector: string): boolean {
    const sectors = this.availabilityForm.get('selectedSectors')?.value || [];
    return sectors.includes(sector);
  }

  // Méthodes pour les expertises
  toggleExpertise(expertise: string) {
    const expertises = this.availabilityForm.get('selectedExpertises')?.value || [];
    const index = expertises.indexOf(expertise);
    
    if (index === -1) {
      expertises.push(expertise);
    } else {
      expertises.splice(index, 1);
    }
    
    this.availabilityForm.get('selectedExpertises')?.setValue(expertises);
  }

  isExpertiseSelected(expertise: string): boolean {
    const expertises = this.availabilityForm.get('selectedExpertises')?.value || [];
    return expertises.includes(expertise);
  }

  closeModal() {
    // Cacher le modal
    const modalElement = document.querySelector('.add-availability-modal') as HTMLElement;
    if (modalElement) {
      modalElement.classList.add('hidden');
      modalElement.classList.remove('flex');
    }
    
    // Informer le ModalService que le modal est fermé
    this.modalService.modalBackdropVisibleSubject.next(false);
    this.resetForm();
    
    // Émettre l'événement close pour le parent
    this.close.emit();
  }

  resetForm() {
    this.availabilityForm.reset({
      role: '',
      experienceLevel: '',
      abbreviation: '',
      country: '',
      cities: [],
      availabilityStatus: '',
      locked: false,
      linkedinUrl: '',
      recruiterMessage: '',
      engagementType: '',
      workModes: [],
      skills: [],
      selectedSectors: [],
      selectedExpertises: [],
      tjm: '',
      salary: '',
      notes: '',
      isSubcontractor: false
    });
    
    // Réinitialiser le tableau des profils sous-traitants
    while (this.subcontractorProfiles.length) {
      this.subcontractorProfiles.removeAt(0);
    }
    
    this.submitError = null;
  }

  onSubmit() {
    if (this.availabilityForm.invalid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.availabilityForm.controls).forEach(key => {
        const control = this.availabilityForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;
    console.log('Formulaire soumis:', this.availabilityForm.value);

    // Envoyer les données au service
    this.availabilityService.saveConsultant(this.availabilityForm.value)
      .subscribe({
        next: (response: ConsultantAvailability) => {
          console.log('Disponibilité enregistrée:', response);
          this.isSubmitting = false;
          
          // Émettre l'événement save pour le parent
          this.save.emit(response);
          
          // Émettre l'événement close pour le parent
          this.close.emit();
          
          // Fermer le modal
          this.closeModal();
          
          // Notifier qu'il faut rafraîchir les données
          this.availabilityService.notifyRefreshNeeded();
          
          // Afficher un message de succès (idéalement avec un service de toast/notification)
          alert('Disponibilité ajoutée avec succès!');
        },
        error: (error: any) => {
          console.error('Erreur lors de l\'enregistrement:', error);
          this.isSubmitting = false;
          this.submitError = error.message || 'Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.';
        }
      });
  }

  compareArrays(array1: any[], array2: any[]): boolean {
    return JSON.stringify(array1) === JSON.stringify(array2);
  }

  // Méthodes pour la gestion du dropdown des villes
  toggleCitiesDropdown(event: Event): void {
    event.stopPropagation();
    this.citiesDropdownOpen = !this.citiesDropdownOpen;
    
    // Fermer le dropdown lorsqu'on clique ailleurs sur la page
    if (this.citiesDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeDropdown);
      }, 0);
    }
  }

  closeDropdown = () => {
    this.citiesDropdownOpen = false;
    document.removeEventListener('click', this.closeDropdown);
  }

  isCitySelected(city: string): boolean {
    return this.selectedCities.includes(city);
  }

  toggleCity(city: string): void {
    const cities = [...this.selectedCities];
    const index = cities.indexOf(city);
    
    if (index === -1) {
      cities.push(city);
    } else {
      cities.splice(index, 1);
    }
    
    this.availabilityForm.get('cities')?.setValue(cities);
  }

  removeCity(city: string): void {
    const cities = this.selectedCities.filter(c => c !== city);
    this.availabilityForm.get('cities')?.setValue(cities);
  }

  // Méthodes pour la gestion du dropdown des secteurs
  toggleSectorsDropdown(event: Event): void {
    event.stopPropagation();
    this.sectorsDropdownOpen = !this.sectorsDropdownOpen;
    
    // Fermer les autres dropdowns
    this.citiesDropdownOpen = false;
    this.expertisesDropdownOpen = false;
    
    // Fermer le dropdown lorsqu'on clique ailleurs sur la page
    if (this.sectorsDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeSectorsDropdown);
      }, 0);
    }
  }

  closeSectorsDropdown = () => {
    this.sectorsDropdownOpen = false;
    document.removeEventListener('click', this.closeSectorsDropdown);
  }

  removeSector(sector: string): void {
    const sectors = this.availabilityForm.get('selectedSectors')?.value || [];
    const updatedSectors = sectors.filter((s: string) => s !== sector);
    this.availabilityForm.get('selectedSectors')?.setValue(updatedSectors);
  }

  // Méthodes pour la gestion du dropdown des expertises
  toggleExpertisesDropdown(event: Event): void {
    event.stopPropagation();
    this.expertisesDropdownOpen = !this.expertisesDropdownOpen;
    
    // Fermer les autres dropdowns
    this.citiesDropdownOpen = false;
    this.sectorsDropdownOpen = false;
    
    // Fermer le dropdown lorsqu'on clique ailleurs sur la page
    if (this.expertisesDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeExpertisesDropdown);
      }, 0);
    }
  }

  closeExpertisesDropdown = () => {
    this.expertisesDropdownOpen = false;
    document.removeEventListener('click', this.closeExpertisesDropdown);
  }

  removeExpertise(expertise: string): void {
    const expertises = this.availabilityForm.get('selectedExpertises')?.value || [];
    const updatedExpertises = expertises.filter((e: string) => e !== expertise);
    this.availabilityForm.get('selectedExpertises')?.setValue(updatedExpertises);
  }
  
  // Méthodes pour la gestion du dropdown des modes de travail
  toggleWorkModesDropdown(event: Event): void {
    event.stopPropagation();
    this.workModesDropdownOpen = !this.workModesDropdownOpen;
    
    // Fermer les autres dropdowns
    this.citiesDropdownOpen = false;
    this.sectorsDropdownOpen = false;
    this.expertisesDropdownOpen = false;
    this.skillsDropdownOpen = false;
    
    // Fermer le dropdown lorsqu'on clique ailleurs sur la page
    if (this.workModesDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeWorkModesDropdown);
      }, 0);
    }
  }

  closeWorkModesDropdown = () => {
    this.workModesDropdownOpen = false;
    document.removeEventListener('click', this.closeWorkModesDropdown);
  }

  isWorkModeSelected(workMode: string): boolean {
    const workModes = this.availabilityForm.get('workModes')?.value || [];
    return workModes.includes(workMode);
  }

  toggleWorkMode(workMode: string): void {
    const workModes = this.availabilityForm.get('workModes')?.value || [];
    const index = workModes.indexOf(workMode);
    
    if (index === -1) {
      workModes.push(workMode);
    } else {
      workModes.splice(index, 1);
    }
    
    this.availabilityForm.get('workModes')?.setValue(workModes);
    this.selectedWorkModes = workModes;
  }

  removeWorkMode(workMode: string): void {
    const workModes = this.availabilityForm.get('workModes')?.value || [];
    const updatedWorkModes = workModes.filter((w: string) => w !== workMode);
    this.availabilityForm.get('workModes')?.setValue(updatedWorkModes);
    this.selectedWorkModes = updatedWorkModes;
  }
  
  // Méthodes pour l'éditeur de texte WYSIWYG Tailwind
  applyTextStyle(style: 'bold' | 'italic' | 'underline'): void {
    switch (style) {
      case 'bold':
        this.isBold = !this.isBold;
        break;
      case 'italic':
        this.isItalic = !this.isItalic;
        break;
      case 'underline':
        this.isUnderline = !this.isUnderline;
        break;
    }
  }
  
  setTextAlignment(alignment: 'left' | 'center' | 'right'): void {
    this.textAlignment = alignment;
  }
}