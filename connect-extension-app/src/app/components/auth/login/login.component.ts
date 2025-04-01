import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../../services/modal.service';
import { EmailAuthCredentials } from '../../../models/user.model';
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
  loginMode: 'email' = 'email';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder,
    public modalService: ModalService // Changé de private à public pour l'accès depuis le template
  ) { }

  ngOnInit(): void {
    // Initialiser le formulaire
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
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