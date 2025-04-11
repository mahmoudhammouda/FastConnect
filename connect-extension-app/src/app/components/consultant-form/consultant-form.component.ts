import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConsultantAvailabilityService } from '../../services/consultant-availability.service';
import { ConsultantFormData } from '../../models/consultant-form.model';
import { AvailabilityStatus, ExperienceLevel, ExperienceLevelString, Experience } from '../../models/consultant.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-consultant-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './consultant-form.component.html',
  styleUrls: ['./consultant-form.component.scss']
})
export class ConsultantFormComponent implements OnInit, OnDestroy {
  @Output() closeForm = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<ConsultantFormData>();
  
  // Formulaire principal
  consultantForm!: FormGroup;
  
  // État du formulaire
  isEditMode = false;
  isLoading = false;
  formError = '';
  formSuccess = '';
  
  // Données de référence pour les dropdowns
  availabilityOptions = [
    { value: 0, label: 'Disponible immédiatement' },
    { value: 1, label: 'Disponible prochainement' },
    { value: 2, label: 'Non disponible' }
  ];
  
  experienceOptions = [
    { value: 'less_than_3', label: 'Moins de 3 ans' },
    { value: 'between_3_and_10', label: '3 à 10 ans' },
    { value: 'more_than_10', label: 'Plus de 10 ans' }
  ];
  
  // Pour les champs à choix multiples
  skillInput = '';
  expertiseInput = '';
  sectorInput = '';
  
  private subscriptions = new Subscription();
  
  constructor(
    private fb: FormBuilder,
    private consultantService: ConsultantAvailabilityService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    // S'abonner au changement de mode (création/édition)
    this.subscriptions.add(
      this.consultantService.getIsEditMode().subscribe(isEdit => {
        this.isEditMode = isEdit;
      })
    );
    
    // S'abonner aux données du formulaire
    this.subscriptions.add(
      this.consultantService.getCurrentFormData().subscribe(data => {
        if (data) {
          this.populateForm(data);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Initialise le formulaire avec les validateurs
   */
  private initForm(): void {
    this.consultantForm = this.fb.group({
      id: [null],
      role: ['', [Validators.required, Validators.minLength(3)]],
      linkedinUrl: ['', [Validators.required, Validators.pattern('https://www.linkedin.com/.*')]],
      skills: [[]],
      location: ['', Validators.required],
      experience: [ExperienceLevel.Intermediate, Validators.required],
      availability: [AvailabilityStatus.Available, Validators.required],
      message: [''],
      phone: [undefined],
      email: [undefined, Validators.email],
      expertises: [[]],
      sectors: [[]],
      experiences: this.fb.array([])
    });
  }

  /**
   * Remplit le formulaire avec les données d'un consultant existant
   */
  private populateForm(data: ConsultantFormData): void {
    // Réinitialiser le formulaire
    this.consultantForm.reset();
    
    // Remplir les champs simples
    this.consultantForm.patchValue({
      id: data.id,
      role: data.role,
      linkedinUrl: data.linkedinUrl,
      skills: data.skills,
      location: data.location,
      experience: data.experience,
      availability: data.availability,
      message: data.message,
      phone: data.phone,
      email: data.email,
      expertises: data.expertises || [],
      sectors: data.sectors || []
    });
  }

  /**
   * Ajoute une compétence
   */
  addSkill(): void {
    if (!this.skillInput.trim()) return;
    
    const skills = [...this.consultantForm.get('skills')?.value || []];
    if (!skills.includes(this.skillInput.trim())) {
      skills.push(this.skillInput.trim());
      this.consultantForm.patchValue({ skills });
    }
    this.skillInput = '';
  }
  
  /**
   * Supprime une compétence
   */
  removeSkill(skill: string): void {
    const skills = [...this.consultantForm.get('skills')?.value || []];
    const index = skills.indexOf(skill);
    if (index !== -1) {
      skills.splice(index, 1);
      this.consultantForm.patchValue({ skills });
    }
  }
  
  /**
   * Soumet le formulaire
   */
  submitForm(): void {
    if (this.consultantForm.invalid) {
      this.formError = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    
    this.isLoading = true;
    this.formError = '';
    
    const formData: ConsultantFormData = this.consultantForm.value;
    
    this.consultantService.saveConsultant(formData).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.formSuccess = 'Disponibilité enregistrée avec succès.';
        this.formSubmitted.emit(formData);
        
        // Fermer la modal après un délai
        setTimeout(() => {
          this.closeModal();
        }, 1500);
      },
      error: (error) => {
        this.isLoading = false;
        this.formError = error.message || 'Une erreur est survenue lors de l\'enregistrement.';
        console.error('[ConsultantForm] Erreur:', error);
      }
    });
  }
  
  /**
   * Ferme la modal
   */
  closeModal(): void {
    this.closeForm.emit();
  }
  
  /**
   * Vérifie si l'utilisateur est autorisé à gérer les consultants
   */
  canManageConsultants(): boolean {
    return this.userService.isRecruiter() || this.userService.isAdmin();
  }
  
  /**
   * Vérifie si l'utilisateur est un consultant
   */
  isConsultant(): boolean {
    return this.userService.isConsultant();
  }
}