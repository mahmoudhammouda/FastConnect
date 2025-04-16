import { Component, OnInit, OnDestroy, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConsultantAvailabilityService } from '../../services/consultant-availability.service';
import { ConsultantFormData } from '../../models/consultant-form.model';
import { AvailabilityStatus, ExperienceLevel, ExperienceLevelString, Experience } from '../../models/consultant.model';
import { ConsultantAvailability } from '../../models/consultant-availability.model';
import { UserService } from '../../services/user.service';

// Importation pour Flowbite
declare global {
  interface Window {
    initFlowbite: any;
  }
}

@Component({
  selector: 'app-consultant-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './consultant-form.component.html',
  styleUrls: ['./consultant-form.component.scss']
})
export class ConsultantFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() closeForm = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<ConsultantFormData>();
  @ViewChild('phoneInput') phoneInput!: ElementRef;
  
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

  ngAfterViewInit(): void {
    // Initialiser les valeurs du téléphone lorsque c'est nécessaire
    setTimeout(() => {
      if (this.phoneInput?.nativeElement) {
        this.initializePhoneField();
      }
    });
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  /**
   * Initialise le champ téléphone avec les valeurs existantes
   */
  private initializePhoneField(): void {
    // Récupérer la valeur initiale du téléphone
    const initialPhone = this.consultantForm.get('phone')?.value;
    
    if (initialPhone) {
      // Extraire le code pays si possible
      const match = initialPhone.match(/^\+(\d+)/);
      if (match) {
        const countryCode = '+' + match[1];
        const number = initialPhone.replace(countryCode, '');
        
        // Mettre à jour le select avec le bon code pays
        const selectElement = document.getElementById('country-code') as HTMLSelectElement;
        if (selectElement) {
          selectElement.value = countryCode;
        }
        
        // Mettre à jour l'input avec seulement le numéro
        this.phoneInput.nativeElement.value = number;
      } else {
        // Si pas de format international, juste mettre la valeur telle quelle
        this.phoneInput.nativeElement.value = initialPhone;
      }
    }
    
    // Écouter les changements sur l'input
    this.phoneInput.nativeElement.addEventListener('input', () => {
      const selectElement = document.getElementById('country-code') as HTMLSelectElement;
      const countryCode = selectElement ? selectElement.value : '+33';
      
      this.updatePhoneNumberWithCountryCode(countryCode, this.phoneInput.nativeElement.value);
    });
  }
  
  /**
   * Met à jour le numéro de téléphone avec le code pays
   */
  private updatePhoneNumberWithCountryCode(countryCode: string, number: string): void {
    // S'assurer que le code pays commence par +
    const formattedCode = countryCode.startsWith('+') ? countryCode : `+${countryCode}`;
    
    // Nettoyer le numéro (enlever les espaces, tirets, etc.)
    const cleanNumber = number.replace(/[^0-9]/g, '');
    
    // Formater le numéro complet
    let fullNumber = '';
    
    if (cleanNumber) {
      fullNumber = `${formattedCode}${cleanNumber}`;
    }
    
    // Mettre à jour le formulaire
    this.consultantForm.patchValue({ phone: fullNumber || null });
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
   * Gère le changement de code pays dans le select
   */
  onCountryCodeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const countryCode = select.value;
    
    if (countryCode) {
      // Récupérer le numéro actuel sans le code pays
      const currentValue = this.phoneInput?.nativeElement.value || '';
      const cleanNumber = currentValue.replace(/^\+\d+\s*/, '');
      
      // Mettre à jour le numéro avec le nouveau code pays
      this.updatePhoneNumberWithCountryCode(countryCode, cleanNumber);
    }
  }
  
  /**
   * Vérifie si l'utilisateur est un consultant
   */
  isConsultant(): boolean {
    return this.userService.isConsultant();
  }
}