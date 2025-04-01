import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class UserProfileComponent implements OnInit {
  currentUser: User | null = null;
  profileForm!: FormGroup;
  isEditing = false;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Vérifier si l'utilisateur est connecté
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }

    // Récupérer l'utilisateur actuel
    this.currentUser = this.authService.currentUser;
    
    // Initialiser le formulaire avec les données actuelles
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.currentUser) return;

    this.profileForm = this.fb.group({
      firstName: [this.currentUser.firstName || '', [Validators.required]],
      lastName: [this.currentUser.lastName || '', [Validators.required]],
      email: [this.currentUser.email, [Validators.required, Validators.email]]
      // D'autres champs pourront être ajoutés par la suite
    });

    // Désactiver le formulaire par défaut (mode lecture seule)
    this.profileForm.disable();
  }

  // Activer le mode édition
  enableEditMode(): void {
    this.isEditing = true;
    this.profileForm.enable();
  }

  // Annuler les modifications
  cancelEdit(): void {
    this.isEditing = false;
    this.initializeForm(); // Réinitialiser le formulaire avec les valeurs d'origine
    this.profileForm.disable();
    this.errorMessage = null;
    this.successMessage = null;
  }

  // Soumettre les modifications
  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    // En environnement de développement, simuler un appel API
    setTimeout(() => {
      // Simuler une mise à jour réussie
      if (this.currentUser) {
        this.currentUser = {
          ...this.currentUser,
          firstName: this.profileForm.value.firstName,
          lastName: this.profileForm.value.lastName,
          email: this.profileForm.value.email
        };
      }
      
      this.isLoading = false;
      this.isEditing = false;
      this.profileForm.disable();
      this.successMessage = 'Profil mis à jour avec succès!';
    }, 1000);

    // Dans un environnement réel, nous enverrions les données à l'API
    /*
    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: (updatedUser) => {
        this.currentUser = updatedUser;
        this.isLoading = false;
        this.isEditing = false;
        this.profileForm.disable();
        this.successMessage = 'Profil mis à jour avec succès!';
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Une erreur est survenue lors de la mise à jour du profil.';
        console.error('Erreur lors de la mise à jour du profil:', error);
      }
    });
    */
  }
}