export interface ConsultantAvailability {
  id: string;
  consultantId: string;
  
  // Informations privées (usage interne)
  consultantName: string;
  consultantEmail?: string;
  consultantPhone?: string;
  acronym?: string;
  internalId?: string;
  
  // Informations publiques
  consultantAbbreviation?: string;
  consultantRole?: string;
  role?: string;  // Ajouté pour la compatibilité avec le add-availability-modal
  startDate: string;
  durationInMonths: number;
  status: 'available' | 'pending' | 'inactive';
  cities: string[];
  workMode: 'onsite' | 'remote' | 'hybrid';
  rate?: number;
  skills?: string[];
  description?: string;
  sectors?: string[];
  experienceLevel?: 'junior' | 'intermediate' | 'senior' | 'expert';
  country?: string;
  
  // Type d'engagement - peut être une valeur unique ou un tableau pour la multi-sélection
  engagementType?: string;
  engagementTypes?: string[]; // Pour la sélection multiple Freelance/Salarié/Sous-traitance
  
  // Coordonnées et liens
  linkedinUrl?: string;
  recruiterMessage?: string;
  
  // Paramètres
  locked?: boolean;
}