export interface ConsultantAvailability {
  id: string;
  consultantId: string;
  consultantName: string;
  consultantRole: string;
  startDate: string;
  durationInMonths: number;
  status: 'available' | 'pending' | 'inactive';
  cities: string[];
  workMode: 'onsite' | 'remote' | 'hybrid';
  rate?: number;
  skills?: string[];
  description?: string;
  sectors?: string[];
  experienceLevel?: 'junior' | 'intermediate' | 'senior';
}