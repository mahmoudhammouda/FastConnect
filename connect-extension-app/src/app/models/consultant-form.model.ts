import { AvailabilityStatus, ExperienceLevel, Experience } from './consultant.model';

/**
 * Type pour les étapes du formulaire
 */
export type FormStep = 'basic' | 'skills' | 'experience' | 'contact';

/**
 * Interface pour les données du formulaire consultant
 */
export interface ConsultantFormData {
  id?: string;                       // Identifiant unique (null pour création)
  role: string;                      // Poste/rôle du consultant
  skills: string[];                  // Compétences techniques
  location: string;                  // Localisation
  experience: ExperienceLevel;       // Niveau d'expérience
  availability: AvailabilityStatus;  // Statut de disponibilité
  message?: string;                  // Message personnalisé
  linkedinUrl: string;               // URL LinkedIn
  phone?: string;                    // Numéro de téléphone (optionnel)
  email?: string;                    // Email (optionnel)
  expertises?: string[];             // Expertises spécifiques (optionnel)
  sectors?: string[];                // Secteurs d'activité (optionnel)
  experiences?: Experience[];        // Expériences professionnelles (optionnel)
}