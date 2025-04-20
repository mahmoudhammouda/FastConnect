/**
 * Modèle pour les consultants
 */

/**
 * Statut de disponibilité d'un consultant
 */
export enum AvailabilityStatus {
  Available = 0,       // Disponible immédiatement
  ComingSoon = 1,      // Disponible prochainement
  Unavailable = 2      // Non disponible
}

/**
 * Niveau d'expérience d'un consultant
 */
export enum ExperienceLevel {
  Junior = 'less_than_3',         // Moins de 3 ans
  Intermediate = 'between_3_and_10', // Entre 3 et 10 ans
  Senior = 'more_than_10'         // Plus de 10 ans
}

// Pour compatibilité avec la base de code existante
export const experienceLevels = ['less_than_3', 'between_3_and_10', 'more_than_10'] as const;
export type ExperienceLevelString = typeof experienceLevels[number];

/**
 * Interface pour une expérience professionnelle
 */
export interface Experience {
  role: string;        // Poste occupé
  company: string;     // Entreprise
  isCurrent: boolean;  // Emploi actuel
}

/**
 * Interface pour un consultant
 */
export interface Consultant {
  id: string;                        // Identifiant unique
  firstName: string;                 // Prénom du consultant
  lastName: string;                  // Nom du consultant
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
  createdBy?: string;                // ID de l'utilisateur qui a créé la fiche
  createdAt?: Date;                  // Date de création
  updatedAt?: Date;                  // Date de dernière mise à jour
}

/**
 * Extension de l'interface Consultant pour la gestion des tags
 * et des favoris dans l'interface utilisateur
 */
export interface ConsultantWithTags extends Consultant {
  tags?: string[];                   // Tags supplémentaires pour la recherche
  isFavorite?: boolean;              // Indique si le consultant est dans les favoris
  isFiltered?: boolean;              // Indique si le consultant est filtré (visible)
  
  // Propriétés additionnelles pour la validation des données de contact
  phoneValidated?: boolean;          // Indique si le numéro de téléphone a été validé
  emailValidated?: boolean;          // Indique si l'email a été validé
  linkedinValidated?: boolean;       // Indique si le profil LinkedIn a été validé
  
  // Propriété pour la protection des données
  locked?: boolean;                  // Indique si les données de contact sont masquées
  type?: string;                     // Type de consultant (freelance, salarié, etc.)
}