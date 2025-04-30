import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../../services/modal.service';
import { NotificationService } from '../../../services/notification.service';
import { LinkedInModalComponent } from '../linkedin-modal/linkedin-modal.component';
import { EmailAuthCredentials, UserRegistration, LinkedInAuthUrlResponse } from '../../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LinkedInModalComponent]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoading = false;
  loginError: string | null = null;
  rememberMe = false;
  loginMode: 'email' = 'email';
  showRegisterForm = false;
  showLinkedInModal = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder,
    public modalService: ModalService, // Changé de private à public pour l'accès depuis le template
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    // Initialiser le formulaire de connexion
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
    
    // Initialiser le formulaire d'inscription
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['consultant', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    // Activer immédiatement le statut de chargement pour l'animation
    this.isLoading = true;
    this.loginError = null;
    this.cdr.detectChanges();

    this.ngZone.run(() => {
      // Utiliser setTimeout pour permettre au navigateur de mettre à jour l'UI
      setTimeout(() => {
        const credentials: EmailAuthCredentials = {
          email: this.loginForm.value.username,
          password: this.loginForm.value.password,
          rememberMe: this.loginForm.value.rememberMe
        };

        this.authService.loginWithEmail(credentials).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.loginError = null;
            this.notificationService.loginSuccess('email');
            this.router.navigate(['/']);
            this.cdr.detectChanges();
          },
          error: (error: HttpErrorResponse) => {
            this.isLoading = false;
            this.handleLoginError(error);
            const errorMessage = this.loginError || 'Erreur de connexion';
            this.notificationService.loginError(errorMessage, 'email');
            this.cdr.detectChanges();
          }
        });
      }, 10);
    });
  }
  
  onRegisterSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    // Activer immédiatement le statut de chargement pour l'animation
    this.isLoading = true;
    this.loginError = null;
    this.cdr.detectChanges();

    this.ngZone.run(() => {
      // Utiliser setTimeout pour permettre au navigateur de mettre à jour l'UI
      setTimeout(() => {
        const registrationData: UserRegistration = {
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          userType: this.registerForm.value.userType
        };

        this.authService.register(registrationData).subscribe({
          next: () => {
            this.isLoading = false;
            this.loginError = '';
            this.showRegisterForm = false;
            this.showLinkedInModal = false;
            this.notificationService.success('Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.', 'Inscription réussie');
            this.cdr.detectChanges();
          },
          error: (error: HttpErrorResponse) => {
            this.handleRegistrationError(error);
            const errorMessage = this.loginError || 'Erreur lors de l\'inscription';
            this.notificationService.error(errorMessage, 'Échec de l\'inscription');
            this.cdr.detectChanges();
          }
        });
      }, 10);
    });
  }
  
  loginWithLinkedIn(): void {
    // Au lieu de rediriger vers LinkedIn, on affiche la modal d'authentification LinkedIn
    this.showLinkedInModal = true;
  }
  
  onLinkedInSuccess(response: any): void {
    this.showLinkedInModal = false;
    this.loginError = null;
    // Fermer la modal d'authentification
    this.closeModal();
    // Rediriger vers la page principale
    this.router.navigate(['/']);
  }

  onLinkedInCancel(): void {
    this.showLinkedInModal = false;
  }
  
  toggleRegisterForm(): void {
    this.showRegisterForm = !this.showRegisterForm;
    this.loginError = null;
    this.isLoading = false;
    
    // Réinitialiser les formulaires lors du changement
    if (this.showRegisterForm) {
      this.loginForm.reset();
    } else {
      this.registerForm.reset({
        userType: 'consultant'
      });
    }
  }

  closeModal(): void {
    this.modalService.closeLoginModal();
    this.resetForm();
  }

  resetForm(): void {
    this.loginForm.reset({
      username: '',
      password: '',
      rememberMe: false
    });
    this.registerForm.reset({
      userType: 'consultant'
    });
    this.loginError = null;
    this.isLoading = false;
    this.showRegisterForm = false;
  }

  private handleLoginError(error: HttpErrorResponse): void {
    this.isLoading = false;
    if (error.status === 401) {
      this.loginError = 'Identifiants incorrects. Veuillez réessayer.';
    } else {
      this.loginError = 'Une erreur est survenue. Veuillez réessayer plus tard.';
    }
    console.error('Erreur de connexion:', error);
  }
  
  private handleRegistrationError(error: HttpErrorResponse): void {
    this.isLoading = false;
    if (error.status === 400) {
      if (error.error?.message?.includes('email')) {
        this.loginError = 'Cet email est déjà utilisé. Veuillez en choisir un autre.';
      } else {
        this.loginError = 'Veuillez vérifier les informations saisies.';
      }
    } else {
      this.loginError = 'Une erreur est survenue lors de la création du compte. Veuillez réessayer plus tard.';
    }
    console.error('Erreur d\'inscription:', error);
  }
}