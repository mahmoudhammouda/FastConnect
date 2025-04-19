export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  photo: string;
  title: string;
  company: string;
  sector: string;
  role: string;
  country: string;
  city: string;
  linkedinUrl: string;
  email?: string;
  phone?: string;
  recruitmentNeeds?: string;
  missions?: string[];
  tags?: string[];
}
