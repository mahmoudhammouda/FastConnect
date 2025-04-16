import { Component, OnInit, OnDestroy, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConsultantAvailabilityService } from '../../services/consultant-availability.service';
import { ConsultantFormData } from '../../models/consultant-form.model';
import { AvailabilityStatus, ExperienceLevel, ExperienceLevelString, Experience } from '../../models/consultant.model';
import { ConsultantAvailability } from '../../models/consultant-availability.model';
import { UserService } from '../../services/user.service';

// Déclaration pour intl-tel-input car TypeScript ne connaît pas tous les types
declare const intlTelInput: any;

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

  // Intl Tel Input instance
  private intlTelInstance: any;
  
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
    // Initialiser intl-tel-input après que la vue soit chargée
    setTimeout(() => {
      if (this.phoneInput?.nativeElement) {
        this.initIntlTelInput();
      }
    });
  }
  
  ngOnDestroy(): void {
    // Détruire l'instance de intlTelInput
    if (this.intlTelInstance) {
      this.intlTelInstance.destroy();
    }
    this.subscriptions.unsubscribe();
  }
  
  /**
   * Initialise le composant international téléphone
   */
  private initIntlTelInput(): void {
    try {
      console.log('Initialisation de intl-tel-input...');
      
      // Ajouter le CSS manuellement (puisque l'import dans angular.json ne fonctionne pas)
      const styleLink = document.createElement('link');
      styleLink.rel = 'stylesheet';
      styleLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/css/intlTelInput.css';
      document.head.appendChild(styleLink);
      
      // Charger la librairie principal depuis un CDN (plus fiable)
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/intlTelInput.min.js';
      script.async = true;
      
      script.onload = () => {
        console.log('Script principal chargé, chargement des utils...');
        
        // Charger utils.js
        const utilsScript = document.createElement('script');
        utilsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js';
        utilsScript.async = true;
        
        utilsScript.onload = () => {
          console.log('Utils chargé, initialisation du composant...');
          
          if (!this.phoneInput?.nativeElement) {
            console.error("L'élément input pour le téléphone n'est pas disponible");
            return;
          }
          
          // L'objet intlTelInput est maintenant disponible dans la fenêtre
          const intTelInput = (window as any).intlTelInput;
          
          if (!intTelInput) {
            console.error("intlTelInput n'est pas disponible dans la fenêtre globale");
            return;
          }
          
          // Configuration pour reproduire exactement l'exemple de l'image
          const options = {
            initialCountry: 'fr',
            preferredCountries: ['fr', 'be', 'ch', 'lu', 'ca'],
            separateDialCode: true,
            formatOnDisplay: true,
            allowDropdown: true,
            autoPlaceholder: 'aggressive',
            customContainer: 'iti-container',
            nationalMode: false,
            utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js'
          };
          
          // Création de l'instance
          this.intlTelInstance = intTelInput(this.phoneInput.nativeElement, options);
          console.log('Instance intlTelInput créée avec succès');
          
          // Événements
          this.phoneInput.nativeElement.addEventListener('countrychange', () => {
            this.updatePhoneNumber();
          });
          
          this.phoneInput.nativeElement.addEventListener('input', () => {
            this.updatePhoneNumber();
          });
          
          // Forcer un peu d'espace à gauche pour le drapeau et l'indicatif
          this.phoneInput.nativeElement.style.paddingLeft = '90px';
          
          // Initialiser avec la valeur existante si présente
          const currentPhone = this.consultantForm.get('phone')?.value;
          if (currentPhone) {
            setTimeout(() => {
              try {
                if (this.intlTelInstance) {
                  this.intlTelInstance.setNumber(currentPhone);
                  console.log('Numéro de téléphone initialisé:', currentPhone);
                }
              } catch (e) {
                console.error('Erreur lors de la définition du numéro:', e);
              }
            }, 100);
          }
        };
        
        document.head.appendChild(utilsScript);
      };
      
      document.head.appendChild(script);
    } catch (error) {
      console.error('[ConsultantForm] Erreur lors du chargement de intlTelInput:', error);
    }
  }
  

  
  /**
   * Met à jour le numéro de téléphone dans le formulaire
   */
  private updatePhoneNumber(): void {
    if (this.intlTelInstance) {
      const isValid = this.intlTelInstance.isValidNumber();
      const fullNumber = this.intlTelInstance.getNumber();
      
      if (isValid) {
        this.consultantForm.patchValue({ phone: fullNumber });
      } else {
        // Mettre à jour le formulaire avec la valeur brute si elle existe
        const rawValue = this.phoneInput.nativeElement.value;
        if (rawValue) {
          this.consultantForm.patchValue({ phone: rawValue });
        } else {
          this.consultantForm.patchValue({ phone: null });
        }
      }
    }
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