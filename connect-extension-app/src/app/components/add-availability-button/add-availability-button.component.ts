import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ConsultantAvailabilityService } from '../../services/consultant-availability.service';
import { ConsultantFormComponent } from '../consultant-form/consultant-form.component';

@Component({
  selector: 'app-add-availability-button',
  standalone: true,
  imports: [CommonModule, ConsultantFormComponent],
  template: `
    <div class="add-availability-container">
      <!-- Bouton pour ajouter une disponibilité -->
      <button *ngIf="canAddAvailability" 
              class="add-availability-button" 
              (click)="openAddAvailabilityForm()"
              title="Ajouter une disponibilité">
        <span class="material-icons">add</span>
      </button>
      
      <!-- Formulaire modal (conditionnel) -->
      <app-consultant-form *ngIf="showForm" 
                          (closeForm)="closeForm()" 
                          (formSubmitted)="onFormSubmitted($event)">
      </app-consultant-form>
    </div>
  `,
  styles: [`
    .add-availability-container {
      position: relative;
    }
    
    .add-availability-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      transition: all 0.2s ease-in-out;
    }
    
    .add-availability-button:hover {
      background-color: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    .add-availability-button:active {
      transform: translateY(0);
    }
    
    .add-availability-button .material-icons {
      font-size: 18px;
    }
  `]
})
export class AddAvailabilityButtonComponent implements OnInit {
  showForm = false; // Contrôle l'affichage du formulaire
  
  constructor(
    private userService: UserService,
    private consultantService: ConsultantAvailabilityService
  ) { }

  ngOnInit(): void {
    // Initialisation du composant
  }
  
  /**
   * Vérifie si l'utilisateur peut ajouter une disponibilité
   */
  get canAddAvailability(): boolean {
    // Les recruteurs et les consultants peuvent ajouter des disponibilités
    return this.userService.isRecruiter() || this.userService.isConsultant();
  }
  
  /**
   * Ouvre le formulaire d'ajout de disponibilité
   */
  openAddAvailabilityForm(): void {
    // Initialise un nouveau formulaire
    this.consultantService.initNewForm();
    // Affiche le formulaire
    this.showForm = true;
  }
  
  /**
   * Ferme le formulaire
   */
  closeForm(): void {
    this.showForm = false;
  }
  
  /**
   * Gère la soumission du formulaire
   */
  onFormSubmitted(formData: any): void {
    console.log('Formulaire soumis:', formData);
    this.showForm = false;
  }
}