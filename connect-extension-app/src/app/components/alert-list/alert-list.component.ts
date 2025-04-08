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
  
  // États pour les dropdowns personnalisés
  experienceDropdownOpen: boolean = false;
  locationDropdownOpen: boolean = false;
  skillsDropdownOpen: boolean = false;
  experienceSearchText: string = '';
  locationSearchText: string = '';
  skillsSearchText: string = '';
  
  // Listes filtrées pour la recherche
  filteredExperienceOptions: string[] = [];
  filteredLocationOptions: string[] = [];
  filteredSkillOptions: string[] = [];
  
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
    
    // Initialiser les listes filtrées
    this.filteredExperienceOptions = [...this.experienceOptions];
    this.filteredLocationOptions = [...this.locationOptions];
    this.filteredSkillOptions = [...this.skillOptions];
    
    // Gestion des clics à l'extérieur des dropdowns pour les fermer
    this.addDropdownListeners();
  }
  
  /**
   * Ajoute des écouteurs d'événements pour gérer les clics en dehors des dropdowns
   */
  private addDropdownListeners(): void {
    // Utilisation de HostListener pour gérer les clics document
    document.addEventListener('click', this.closeDropdownsOnClickOutside.bind(this));
  }
  
  /**
   * Ferme les dropdowns si on clique en dehors
   */
  private closeDropdownsOnClickOutside(event: MouseEvent): void {
    if (this.experienceDropdownOpen || this.locationDropdownOpen || this.skillsDropdownOpen) {
      const target = event.target as HTMLElement;
      if (!this.elementRef.nativeElement.contains(target) || 
          !target.closest('.custom-dropdown')) {
        this.experienceDropdownOpen = false;
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
      this.experienceSearchText = '';
      this.filteredExperienceOptions = [...this.experienceOptions];
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
      this.skillsDropdownOpen = false;
      this.locationSearchText = '';
      this.filteredLocationOptions = [...this.locationOptions];
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
      this.skillsSearchText = '';
      this.filteredSkillOptions = [...this.skillOptions];
    }
  }
  
  /**
   * Filtre les options d'expérience selon le texte de recherche
   */
  filterExperienceOptions(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();
    this.experienceSearchText = searchText;
    this.filteredExperienceOptions = this.experienceOptions.filter(
      exp => exp.toLowerCase().includes(searchText)
    );
  }
  
  /**
   * Filtre les options de localisation selon le texte de recherche
   */
  filterLocationOptions(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();
    this.locationSearchText = searchText;
    this.filteredLocationOptions = this.locationOptions.filter(
      loc => loc.toLowerCase().includes(searchText)
    );
  }
  
  /**
   * Filtre les options de compétences selon le texte de recherche
   */
  filterSkillOptions(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();
    this.skillsSearchText = searchText;
    this.filteredSkillOptions = this.skillOptions.filter(
      skill => skill.toLowerCase().includes(searchText)
    );
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
      ? `${this.tempExperience.length} niveau${this.tempExperience.length > 1 ? 'x' : ''} d'expérience sélectionné${this.tempExperience.length > 1 ? 's' : ''}`
      : 'Sélectionner des niveaux d\'expérience';
  }
  
  /**
   * Obtient le texte à afficher dans le bouton de dropdown de localisation
   */
  getLocationDisplayText(): string {
    return this.tempLocation.length > 0 
      ? `${this.tempLocation.length} localisation${this.tempLocation.length > 1 ? 's' : ''} sélectionnée${this.tempLocation.length > 1 ? 's' : ''}`
      : 'Sélectionner des localisations';
  }
  
  /**
   * Obtient le texte à afficher dans le bouton de dropdown de compétences
   */
  getSkillsDisplayText(): string {
    return this.tempSkills.length > 0
      ? `${this.tempSkills.length} compétence${this.tempSkills.length > 1 ? 's' : ''} sélectionnée${this.tempSkills.length > 1 ? 's' : ''}`
      : 'Sélectionner des compétences';
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
      skills: this.tempSkills
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
      skills: this.tempSkills
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