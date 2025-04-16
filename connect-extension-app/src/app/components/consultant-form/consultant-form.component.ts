import { Component, OnInit, OnDestroy, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
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
  
  @ViewChild('phoneButton') phoneButton!: ElementRef;
  
  /**
   * Initialise le composant téléphone avec Flowbite
   */
  private initIntlTelInput(): void {
    try {
      console.log('Initialisation du composant téléphone Flowbite...');
      
      // Dynamiquement charger et initialiser Flowbite
      import('flowbite').then((flowbite) => {
        console.log('Flowbite chargé avec succès');

        // Forcer l'initialisation des dropdowns
        if (typeof window.initFlowbite === 'function') {
          console.log('Initialisation manuelle de Flowbite');
          window.initFlowbite();
        } else {
          console.log('Flowbite devrait s\'initialiser automatiquement');
        }
        
        // Ajouter des gestionnaires d'événements pour les options de pays
        setTimeout(() => {
          const countryOptions = document.querySelectorAll('.country-option');
          const phoneButton = document.getElementById('dropdown-phone-button');
          
          console.log('Options de pays trouvées:', countryOptions.length);
          console.log('Bouton téléphone trouvé:', !!phoneButton);
          
          // Ajouter des écouteurs d'événements à chaque option de pays
          countryOptions.forEach(option => {
            option.addEventListener('click', (e) => {
              const target = e.currentTarget as HTMLElement;
              const countryCode = target.getAttribute('data-code');
              const countryElement = target.querySelector('svg')?.cloneNode(true);
              const phoneInput = this.phoneInput.nativeElement;
              
              console.log('Option de pays cliquée:', countryCode);
              
              // Mettre à jour le bouton de pays
              if (phoneButton && countryCode) {
                // Récupérer l'élément svg existant dans le bouton
                const currentSvg = phoneButton.querySelector('svg:first-child');
                
                // Remplacer le SVG s'il existe
                if (currentSvg && countryElement) {
                  phoneButton.replaceChild(countryElement, currentSvg);
                }
                
                // Mettre à jour le texte du code pays affiché
                // Trouver le nœud de texte entre les deux SVG
                let textUpdated = false;
                for (let i = 0; i < phoneButton.childNodes.length; i++) {
                  const node = phoneButton.childNodes[i];
                  if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent = countryCode + ' ';
                    textUpdated = true;
                    break;
                  }
                }
                
                // Si aucun nœud de texte n'a été trouvé, créer et insérer un nouveau
                if (!textUpdated) {
                  const textNode = document.createTextNode(countryCode + ' ');
                  // Insérer avant le deuxième SVG (flèche vers le bas)
                  const secondSvg = phoneButton.querySelector('svg:nth-child(2)');
                  if (secondSvg) {
                    phoneButton.insertBefore(textNode, secondSvg);
                  } else {
                    phoneButton.appendChild(textNode);
                  }
                }
                
                // Mettre à jour la valeur du formulaire
                this.updatePhoneNumberWithCountryCode(countryCode, phoneInput.value);
              }
            });
          });
          
          // Écouter les changements sur l'input
          this.phoneInput.nativeElement.addEventListener('input', () => {
            // Récupérer le code pays actuel dans le texte du bouton
            let currentCode = '+33'; // Valeur par défaut
            
            if (phoneButton) {
              for (let i = 0; i < phoneButton.childNodes.length; i++) {
                const node = phoneButton.childNodes[i];
                if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
                  currentCode = node.textContent.trim();
                  break;
                }
              }
            }
            
            this.updatePhoneNumberWithCountryCode(currentCode, this.phoneInput.nativeElement.value);
          });
          
          // Initialiser avec la valeur existante si présente
          const initialPhone = this.consultantForm.get('phone')?.value;
          if (initialPhone) {
            // Extraire le code pays si possible
            const match = initialPhone.match(/^\+(\d+)/);
            if (match) {
              const countryCode = '+' + match[1];
              const number = initialPhone.replace(countryCode, '');
              
              // Trouver l'option de pays correspondante
              const matchingOption = Array.from(countryOptions).find(
                opt => (opt as HTMLElement).getAttribute('data-code') === countryCode
              ) as HTMLElement;
              
              if (matchingOption) {
                // Simuler un clic pour mettre à jour l'interface
                matchingOption.click();
              }
              
              // Mettre à jour l'input avec seulement le numéro
              this.phoneInput.nativeElement.value = number;
            } else {
              // Si pas de format international, juste mettre la valeur telle quelle
              this.phoneInput.nativeElement.value = initialPhone;
            }
          }
          
          console.log('Composant téléphone initialisé avec succès');
        }, 1000); // Délai augmenté pour s'assurer que le DOM est prêt
      }).catch(error => {
        console.error('Erreur lors du chargement de Flowbite:', error);
      });
    } catch (error) {
      console.error("[ConsultantForm] Erreur lors de l'initialisation du composant téléphone:", error);
    }
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
   * Vérifie si l'utilisateur est un consultant
   */
  isConsultant(): boolean {
    return this.userService.isConsultant();
  }
}