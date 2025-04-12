import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ConsultantAvailability } from '../../models/consultant-availability.model';
import { ConsultantAvailabilityService } from '../../services/consultant-availability.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-availability-list',
  templateUrl: './availability-list.component.html',
  styleUrls: ['./availability-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AvailabilityListComponent implements OnInit {
  consultantAvailabilities: ConsultantAvailability[] = [];
  
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
  
  editAvailability(availability: ConsultantAvailability): void {
    // Ouverture en mode édition
    this.modalService.openAddAvailabilityModal(availability, false).then(() => {
      // Recharger les disponibilités après fermeture du modal (si édition réussie)
      this.loadAvailabilities();
    });
  }
  
  deleteAvailability(availability: ConsultantAvailability): void {
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
}