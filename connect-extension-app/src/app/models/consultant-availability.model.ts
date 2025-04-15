export interface ConsultantAvailability {
  id: string;
  consultantId: string;
  consultantName: string;
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
  
  // Propriétés supplémentaires du add-availability-modal
  linkedinUrl?: string;
  country?: string;
  engagementType?: string;
  locked?: boolean;
  recruiterMessage?: string;
}