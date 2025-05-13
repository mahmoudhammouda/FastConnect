import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../../services/modal.service';
import { NotificationService } from '../../../services/notification.service';
import { WindowEventService } from '../../../services/window-event.service';
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
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoading = false;
  loginError: string | null = null;
  rememberMe = false;
  loginMode: 'email' = 'email';
  showRegisterForm = false;
  showLinkedInModal = false;
  linkedInAuthInProgress = false; // Indique si une authentification LinkedIn est en cours
  private checkInterval: any = null;
  
  // Subject pour gérer les unsubscriptions lors de la destruction du composant
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder,
    public modalService: ModalService, // Changé de private à public pour l'accès depuis le template
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private notificationService: NotificationService,
    private windowEventService: WindowEventService
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userType: ['consultant', [Validators.required]]
    });
    
    // Pour l'authentification LinkedIn, s'abonner aux messages via le service RxJS
    this.windowEventService.message()
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: MessageEvent) => this.handleLinkedInMessages(event));

    // Mettre en place l'écouteur global pour LinkedIn
    this.setupGlobalLinkedInListener();
  }
  
  ngOnDestroy(): void {
    // Nettoyer l'écouteur pour éviter les fuites mémoire
    this.destroy$.next(); // Appeler next sur le sujet pour takeUntil
    this.destroy$.complete(); // Compléter le sujet
    
    // Nettoyer l'intervalle de vérification s'il existe encore
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
  
  // Cette méthode a été déplacée plus bas pour éviter la duplication
  
  /**
   * Met en place un observateur pour détecter l'authentification LinkedIn réussie
   * Cette méthode utilise RxJS pour observer les changements d'état d'authentification
   * plutôt que de se baser sur les événements du localStorage
   */
  setupGlobalLinkedInListener(): void {
    console.log('[Login Component] Configuration de l\'observateur RxJS pour l\'authentification LinkedIn');

    // Souscrire aux changements d'état d'authentification via le BehaviorSubject
    this.authService.authState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(authState => {
      console.log('[Login Component] Changement d\'état d\'authentification détecté:', authState);
      
      try {
        // Vérifier si l'utilisateur est maintenant authentifié
        if (authState.isAuthenticated) {
          console.log('[Login Component] Authentification valide détectée via RxJS, fermeture de la modal');
          
          this.ngZone.run(() => {
            this.closeModal();
            this.notificationService.loginSuccess('linkedin');
          });
        }
      } catch (error) {
        console.error('[Login Component] Erreur lors du traitement du changement d\'\u00e9tat d\'authentification', error);
      }
    });
    
    // Force un rafraîchissement initial de l'état d'authentification
    // pour s'assurer que nous avons les données les plus récentes
    this.authService.refreshAuthState();
    
    // Vérifier périodiquement s'il y a des données d'authentification
    // Ce mécanisme complémentaire vérifie toutes les secondes
    this.checkInterval = setInterval(() => {
      if (this.showLinkedInModal && this.authService.isAuthenticated) {
        console.log('[Login Component] Authentification détectée lors de la vérification périodique');
        this.ngZone.run(() => {
          this.showLinkedInModal = false;
          this.closeModal();
          this.notificationService.loginSuccess('linkedin');
          clearInterval(this.checkInterval);
        });
      }
    }, 1000);
    
    // Nettoyer l'intervalle après 30 secondes maximum
    setTimeout(() => {
      if (this.checkInterval) {
        clearInterval(this.checkInterval);
        this.checkInterval = null;
      }
    }, 30000);  // 30 secondes maximum
  }

  // Gestionnaire pour les messages provenant du composant LinkedIn
  private handleLinkedInMessages = (event: MessageEvent) => {
    // Vérifier si c'est un message pour fermer le modal
    if (event.data && event.data.type === 'close-linkedin-modal') {
      console.log('Fermeture automatique du modal de login après LinkedIn auth');
      this.modalService.closeLoginModal();
    }
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
            // Fermer le modal de connexion après authentification réussie
            this.modalService.closeLoginModal();
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
    // Indiquer que l'authentification LinkedIn est en cours
    this.linkedInAuthInProgress = true;
    
    // Réinitialiser cet état après un certain temps ou si la modal est fermée
    const resetTimeout = setTimeout(() => {
      this.linkedInAuthInProgress = false;
      clearTimeout(resetTimeout);
    }, 120000); // 2 minutes maximum
  }
  
  onLinkedInSuccess(response: any): void {
    console.log('[Login Component] LinkedIn authentification réussie, traitement SYNCHRONE...');
    
    try {
      // Action 1: Masquer la modal LinkedIn et réinitialiser les erreurs
      this.showLinkedInModal = false;
      this.linkedInAuthInProgress = false; // Réinitialiser l'indicateur d'authentification LinkedIn
      this.loginError = null;
      
      // Action 2: Fermer IMMEDIATEMENT la modal de login principale
      console.log('[Login Component] Fermeture SYNCHRONE de la modal de login');
      document.getElementById('login-modal-close-btn')?.click();
      this.modalService.closeLoginModal();
      this.cdr.detectChanges(); // Force la détection des changements Angular
      
      // Action 3: Afficher la notification de succès
      console.log('[Login Component] Affichage de la notification de succès LinkedIn');
      this.notificationService.loginSuccess('linkedin');
      
      // Action 4: Rediriger vers la page principale
      console.log('[Login Component] Redirection vers la page principale');
      this.router.navigate(['/']);
      
      // Action 5: Tentative supplémentaire de fermeture après un court délai
      setTimeout(() => {
        console.log('[Login Component] Tentative supplémentaire de fermeture');
        this.closeModal();
        this.modalService.closeLoginModal();
      }, 200);
      
    } catch (error) {
      console.error('[Login Component] Erreur lors du traitement de l\'authentification LinkedIn:', error);
      // Réinitialiser l'indicateur d'authentification LinkedIn même en cas d'erreur
      this.linkedInAuthInProgress = false;
      // Tenter la fermeture manuelle, même en cas d'erreur
      this.modalService.closeLoginModal();
    }
  }

  onLinkedInCancel(): void {
    this.showLinkedInModal = false;
    this.linkedInAuthInProgress = false; // Réinitialiser l'indicateur d'authentification LinkedIn
    console.log('[Login Component] Authentification LinkedIn annulée');
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

  /**
   * Ferme la modale de connexion et réinitialise l'état
   */
  closeModal(): void {
    console.log('[Login Component] Fermeture de la modale de connexion');
    this.showLinkedInModal = false;
    this.linkedInAuthInProgress = false; // Réinitialiser l'indicateur d'authentification LinkedIn
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