/**
 * Enumération des rôles d'utilisateur possibles
 */
export enum UserRole {
  Admin = 'admin',
  Consultant = 'consultant',
  Recruiter = 'recruiter'
}

/**
 * Modèle représentant un utilisateur dans l'application
 */
export interface User {
  id: string;
  username: string;
  email: string;
  linkedInProfile?: string;
  profileImageUrl?: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
  onboardingCompleted: boolean;
  skills: string[];
  location?: string;
  phoneNumber?: string;
  title?: string;
  isVerified: boolean;
  isLinkedInAuthenticated: boolean;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
}

/**
 * Informations d'authentification par email/mot de passe
 */
export interface EmailAuthCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Informations de connexion LinkedIn
 */
export interface LinkedInProfile {
  email: string;
  linkedInToken: string;
  firstName?: string;
  lastName?: string;
  profileUrl?: string;
  pictureUrl?: string;
}

/**
 * Informations d'inscription d'un utilisateur
 */
export interface UserRegistration {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  linkedInProfile?: string;
  profileImageUrl?: string;
  role?: UserRole;
  location?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Informations pour l'onboarding d'un utilisateur
 */
export interface UserOnboarding {
  userRole: UserRole;
  title: string;
  firstName?: string;
  lastName?: string;
  skills?: string[];
  location?: string;
}

/**
 * Réponse du serveur après authentification
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  refreshToken: string;
  expiration: string;
  user: User;
}

/**
 * État d'authentification actuel
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  tokenExpiration: Date | null;
}

/**
 * Requête de rafraîchissement de token
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}