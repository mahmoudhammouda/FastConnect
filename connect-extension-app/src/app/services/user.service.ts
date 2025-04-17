import { Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const USER_SERVICE_TOKEN = new InjectionToken<UserService>('UserService');

/**
 * Enum pour les types d'utilisateurs
 */
export enum UserRole {
  Admin = 'ADMIN',
  Recruiter = 'RECRUITER',
  Consultant = 'CONSULTANT',
  Guest = 'GUEST'
}

/**
 * Interface pour le profil utilisateur
 */
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  lastLogin: Date;
}

/**
 * Service de gestion des utilisateurs
 * Ce service gère l'authentification, les rôles et les profils utilisateurs
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // État de connexion de l'utilisateur
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  
  // Profil de l'utilisateur actuel
  private currentUser = new BehaviorSubject<UserProfile | null>(null);
  
  constructor() {
    // Charger l'utilisateur depuis le stockage local au démarrage
    this.loadUserFromStorage();
  }
  
  /**
   * Charge l'utilisateur depuis le localStorage s'il existe
   */
  private loadUserFromStorage(): void {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser) as UserProfile;
        this.currentUser.next(user);
        this.isAuthenticated.next(true);
      }
    } catch (error) {
      console.error('[UserService] Erreur lors du chargement de l\'utilisateur:', error);
      this.logout();
    }
  }
  
  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
    this.isAuthenticated.next(false);
  }
  
  /**
   * Vérifie si l'utilisateur est administrateur
   */
  isAdmin(): boolean {
    return this.currentUser.value?.role === UserRole.Admin;
  }
  
  /**
   * Vérifie si l'utilisateur est recruteur
   */
  isRecruiter(): boolean {
    return this.currentUser.value?.role === UserRole.Recruiter || this.isAdmin();
  }
  
  /**
   * Vérifie si l'utilisateur est consultant
   */
  isConsultant(): boolean {
    return this.currentUser.value?.role === UserRole.Consultant;
  }
  
  /**
   * Obtient l'ID de l'utilisateur actuel
   */
  getCurrentUserId(): string | null {
    return this.currentUser.value?.id || null;
  }
  
  /**
   * Obtient le profil de l'utilisateur actuel
   */
  getCurrentUser(): Observable<UserProfile | null> {
    return this.currentUser.asObservable();
  }
  
  /**
   * Obtient l'état d'authentification
   */
  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
  
  /**
   * Met à jour le profil de l'utilisateur
   */
  updateUserProfile(profile: Partial<UserProfile>): void {
    const currentProfile = this.currentUser.value;
    if (currentProfile) {
      const updatedProfile = { ...currentProfile, ...profile };
      localStorage.setItem('currentUser', JSON.stringify(updatedProfile));
      this.currentUser.next(updatedProfile);
    }
  }
  
  /**
   * Pour démo/test seulement: simule une connexion
   */
  simulateLogin(role: UserRole): void {
    const mockUser: UserProfile = {
      id: 'user-' + Math.floor(Math.random() * 1000),
      email: `${role.toLowerCase()}@fastconnect.io`,
      name: `${role.charAt(0)}${role.slice(1).toLowerCase()}`,
      role: role,
      createdAt: new Date(),
      lastLogin: new Date()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    this.currentUser.next(mockUser);
    this.isAuthenticated.next(true);
  }
}