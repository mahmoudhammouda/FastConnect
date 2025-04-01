/**
 * Modèle pour les utilisateurs de l'application
 */
export type UserRole = 'admin' | 'consultant' | 'recruiter';

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
  // Les informations sensibles comme le mot de passe ne sont pas incluses dans ce modèle
}

/**
 * Informations d'authentification
 */
export interface AuthCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Réponse d'authentification
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
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