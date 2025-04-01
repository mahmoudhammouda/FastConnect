import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../../services/modal.service';
import { EmailAuthCredentials, LinkedInProfile } from '../../../models/user.model';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  loginError: string | null = null;
  rememberMe = false;
  loginMode: 'email' | 'social' = 'email'; // Mode de connexion par défaut

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder,
    public modalService: ModalService, // Changé de private à public pour l'accès depuis le template
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
    // Initialiser le formulaire
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    // S'abonner aux événements d'authentification social
    this.socialAuthService.authState.subscribe(user => {
      if (user) {
        // Convertir les données de l'utilisateur Google au format attendu par votre API
        const profile: LinkedInProfile = {
          email: user.email,
          linkedInToken: user.idToken || '', // Pour le moment on utilise le token Google
          firstName: user.firstName,
          lastName: user.lastName,
          profileUrl: user.response?.profile_url || '',
          pictureUrl: user.photoUrl
        };

        this.isLoading = true;
        // Comme loginWithSocialMedia n'existe pas, utilisons loginWithEmail à la place pour le moment
        // À remplacer une fois que vous aurez implémenté loginWithSocialMedia dans AuthService
        this.authService.loginWithEmail({
          email: profile.email,
          password: 'defaultPassword', // À modifier selon votre besoin
          rememberMe: true
        }).subscribe({
          next: () => {
            this.isLoading = false;
            this.closeModal();
          },
          error: (error: HttpErrorResponse) => {
            this.handleLoginError(error);
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.loginError = null;

    const credentials: EmailAuthCredentials = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
      rememberMe: this.loginForm.value.rememberMe
    };

    this.authService.loginWithEmail(credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.closeModal();
      },
      error: (error: HttpErrorResponse) => {
        this.handleLoginError(error);
      }
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
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
    this.loginError = null;
    this.isLoading = false;
  }

  switchLoginMode(mode: 'email' | 'social'): void {
    this.loginMode = mode;
    this.loginError = null;
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
}