/**
 * Modèle pour les utilisateurs de l'application FastConnect
 */
export type UserRole = 'admin' | 'consultant' | 'recruiter';

export type AuthMethod = 'linkedin' | 'email';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  lastLogin?: Date;
  isActive: boolean;
  profession?: string;       // Ajout du champ métier/profession
  linkedinId?: string;       // ID LinkedIn si authentifié par LinkedIn
  authMethod: AuthMethod;    // Méthode d'authentification utilisée
  hasCompletedOnboarding?: boolean; // Si l'utilisateur a complété le processus d'inscription initial
  // Les informations sensibles comme le mot de passe ne sont pas incluses dans ce modèle
}

/**
 * Informations d'authentification par email
 */
export interface EmailAuthCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Informations d'authentification par LinkedIn
 */
export interface LinkedInAuthCredentials {
  accessToken: string;
  rememberMe?: boolean;
}

/**
 * Informations d'authentification combinées
 */
export type AuthCredentials = EmailAuthCredentials | LinkedInAuthCredentials;

/**
 * Profil utilisateur LinkedIn
 */
export interface LinkedInProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  headline?: string; // Titre professionnel sur LinkedIn
}

/**
 * Informations d'inscription utilisateur
 */
export interface UserRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profession: string;
  role: UserRole;
  linkedinId?: string;
  profilePicture?: string;
}

/**
 * Réponse d'authentification
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
  isNewUser?: boolean; // Indique si c'est un nouvel utilisateur qui doit compléter son profil
}

/**
 * État de l'authentification stocké
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken?: string | null;
  expiresAt?: Date | null;
  isAuthenticated: boolean;
}