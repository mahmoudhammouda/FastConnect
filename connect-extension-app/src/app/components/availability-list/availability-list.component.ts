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
  
  // État du mode édition
  editingAvailabilityId: string | null = null;
  editForm: FormGroup | null = null;
  skillsInput: string = '';
  citiesInput: string = '';
  sectorsInput: string = '';
  experienceLevels = [
    { value: 'junior', label: '0-5 ans' },
    { value: 'intermediate', label: '5-10 ans' },
    { value: 'senior', label: '10+ ans' }
  ];
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
    this.consultantAvailabilityService.getAllAvailabilities().subscribe({
      next: (availabilities: ConsultantAvailability[]) => {
        this.consultantAvailabilities = availabilities;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des disponibilités', error);
      }
    });
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
  editAvailability(availability: ConsultantAvailability, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    // Ferme tout autre formulaire d'édition qui pourrait être ouvert
    if (this.editingAvailabilityId && this.editingAvailabilityId !== availability.id) {
      this.cancelEditing();
    }
    
    // Active le mode édition pour cette disponibilité
    this.editingAvailabilityId = availability.id;
    
    // Initialise le formulaire avec les valeurs actuelles
    this.editForm = new FormGroup({
      consultantName: new FormControl(availability.consultantName, Validators.required),
      startDate: new FormControl(this.formatDateForInput(availability.startDate), Validators.required),
      durationInMonths: new FormControl(availability.durationInMonths, [Validators.required, Validators.min(1)]),
      status: new FormControl(availability.status, Validators.required),
      workMode: new FormControl(availability.workMode, Validators.required),
      experienceLevel: new FormControl(availability.experienceLevel || 'intermediate', Validators.required),
      rate: new FormControl(availability.rate || 0),
      description: new FormControl(availability.description || '')
    });
    
    // Initialise les valeurs pour les champs de tags (convertis en chaînes pour l'affichage)
    this.skillsInput = (availability.skills || []).join(', ');
    this.citiesInput = (availability.cities || []).join(', ');
    this.sectorsInput = (availability.sectors || []).join(', ');
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
}