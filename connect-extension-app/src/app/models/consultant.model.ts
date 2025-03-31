export type ExperienceLevel = 'less_than_3' | 'between_3_and_10' | 'more_than_10';
export type AvailabilityStatus = number; // 0: available, 1: soon, 2: unavailable

export interface Experience {
  role: string;       // Poste occupé
  company: string;    // Nom de l'entreprise
  isCurrent?: boolean;  // Si c'est l'expérience actuelle
}

export interface Consultant {
  id: string;                   // Identifiant unique du consultant
  role: string;                 // Poste/rôle du consultant
  linkedinUrl: string;          // URL du profil LinkedIn
  phone: string | null;         // Numéro de téléphone (null si non disponible)
  email: string | null;         // Adresse email (null si non disponible)
  locked: boolean;              // État de verrouillage (disponible ou non)
  type: string;                 // Type de consultant
  skills: string[];             // Liste des compétences
  location: string;             // Localisations géographiques (séparées par des virgules)
  experience: ExperienceLevel;  // Niveau d'expérience
  phoneValidated: boolean;      // Validation du téléphone
  emailValidated: boolean;      // Validation de l'email
  linkedinValidated: boolean;   // Validation du profil LinkedIn
  availability: AvailabilityStatus;  // Disponibilité
  message: string;              // Message personnalisé du consultant
  experiences: Experience[];    // Dernières expériences professionnelles
  expertises?: string[];        // Expertises spécifiques (différentes des skills techniques)
  sectors?: string[];           // Secteurs d'activité dans lesquels le consultant évolue ou souhaite évoluer
}

export interface ConsultantWithTags extends Consultant {
  tags: string[];               // Hashtags extraits du message
}
