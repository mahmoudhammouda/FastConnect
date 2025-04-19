import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private mockContacts: Contact[] = [
    {
      id: '1',
      firstName: 'Sophie',
      lastName: 'Martin',
      photo: 'assets/mock-avatars/avatar-1.jpg',
      title: 'Responsable Recrutement IT',
      company: 'TechSolutions SA',
      sector: 'Informatique',
      role: 'Recruteur',
      country: 'France',
      city: 'Paris',
      linkedinUrl: 'https://www.linkedin.com/in/sophie-martin/',
      email: 'sophie.martin@techsolutions.com',
      phone: '+33 6 12 34 56 78',
      recruitmentNeeds: 'Développeurs full-stack, Data Scientists',
      missions: ['Développeur React', 'Data Scientist'],
      tags: ['Tech', 'IT', 'Recrutement']
    },
    {
      id: '2',
      firstName: 'Thomas',
      lastName: 'Dubois',
      photo: 'assets/mock-avatars/avatar-2.jpg',
      title: 'Talent Acquisition Manager',
      company: 'FinTech Innovations',
      sector: 'Finance',
      role: 'Recruteur',
      country: 'France',
      city: 'Lyon',
      linkedinUrl: 'https://www.linkedin.com/in/thomas-dubois/',
      email: 'thomas.dubois@fintech-innov.com',
      recruitmentNeeds: 'Développeurs back-end, DevOps',
      missions: ['Développeur Java/Spring', 'DevOps Engineer'],
      tags: ['Finance', 'Technologie', 'DevOps']
    },
    {
      id: '3',
      firstName: 'Emma',
      lastName: 'Leroy',
      photo: 'assets/mock-avatars/avatar-3.jpg',
      title: 'Directrice des Ressources Humaines',
      company: 'BioSanté Solutions',
      sector: 'Santé',
      role: 'DRH',
      country: 'France',
      city: 'Montpellier',
      linkedinUrl: 'https://www.linkedin.com/in/emma-leroy/',
      phone: '+33 6 98 76 54 32',
      recruitmentNeeds: 'Ingénieurs informatiques spécialisés en santé',
      missions: ['Développeur d\'applications médicales', 'Chef de projet IT Santé'],
      tags: ['Santé', 'IT Médical', 'Innovation']
    },
    {
      id: '4',
      firstName: 'Alexandre',
      lastName: 'Moreau',
      photo: 'assets/mock-avatars/avatar-4.jpg',
      title: 'CTO',
      company: 'DataIntelligence',
      sector: 'Data & IA',
      role: 'Technique',
      country: 'France',
      city: 'Bordeaux',
      linkedinUrl: 'https://www.linkedin.com/in/alexandre-moreau/',
      email: 'a.moreau@dataintelligence.fr',
      recruitmentNeeds: 'Data Engineers, ML Engineers',
      missions: ['Lead Data Engineer', 'Machine Learning Engineer'],
      tags: ['Data', 'IA', 'Machine Learning']
    },
    {
      id: '5',
      firstName: 'Clara',
      lastName: 'Bernard',
      photo: 'assets/mock-avatars/avatar-5.jpg',
      title: 'Responsable des Opérations Techniques',
      company: 'CloudSphere',
      sector: 'Cloud Computing',
      role: 'Technique',
      country: 'Belgique',
      city: 'Bruxelles',
      linkedinUrl: 'https://www.linkedin.com/in/clara-bernard/',
      email: 'clara.bernard@cloudsphere.eu',
      phone: '+32 470 12 34 56',
      recruitmentNeeds: 'Cloud Architects, DevOps Engineers',
      missions: ['Cloud Architect AWS', 'SRE Engineer'],
      tags: ['Cloud', 'AWS', 'DevOps']
    },
    {
      id: '6',
      firstName: 'Nicolas',
      lastName: 'Petit',
      photo: 'assets/mock-avatars/avatar-6.jpg',
      title: 'Talent Acquisition Lead',
      company: 'Mobility Future',
      sector: 'Transport',
      role: 'Recruteur',
      country: 'Suisse',
      city: 'Genève',
      linkedinUrl: 'https://www.linkedin.com/in/nicolas-petit/',
      email: 'nicolas.petit@mobilityfuture.ch',
      recruitmentNeeds: 'Développeurs mobiles, Ingénieurs embarqués',
      missions: ['Développeur Flutter', 'Ingénieur systèmes embarqués'],
      tags: ['Mobilité', 'Transport', 'IoT']
    },
    {
      id: '7',
      firstName: 'Julie',
      lastName: 'Lambert',
      photo: 'assets/mock-avatars/avatar-7.jpg',
      title: 'Directrice du Département IT',
      company: 'EcoTech Solutions',
      sector: 'Environnement',
      role: 'Direction',
      country: 'France',
      city: 'Nantes',
      linkedinUrl: 'https://www.linkedin.com/in/julie-lambert/',
      phone: '+33 6 45 67 89 10',
      recruitmentNeeds: 'Développeurs full-stack, Data Analysts',
      missions: ['Développeur Node.js', 'Data Analyst environnemental'],
      tags: ['IT', 'Environnement', 'Tech Verte']
    },
    {
      id: '8',
      firstName: 'Marc',
      lastName: 'Dupont',
      photo: 'assets/mock-avatars/avatar-8.jpg',
      title: 'CEO',
      company: 'Startup Factory',
      sector: 'Incubateur',
      role: 'Direction',
      country: 'France',
      city: 'Lille',
      linkedinUrl: 'https://www.linkedin.com/in/marc-dupont/',
      email: 'marc.dupont@startupfactory.fr',
      recruitmentNeeds: 'CTOs, Développeurs full-stack',
      missions: ['CTO as a Service', 'Lead Developer'],
      tags: ['Startup', 'Incubateur', 'Innovation']
    }
  ];

  constructor() { }

  getContacts(): Observable<Contact[]> {
    return of(this.mockContacts);
  }

  searchContacts(keyword: string = '', filters: any = {}): Observable<Contact[]> {
    let filteredContacts = [...this.mockContacts];
    
    // Filtrage par mot-clé (recherche dans plusieurs champs)
    if (keyword) {
      const searchTerm = keyword.toLowerCase();
      filteredContacts = filteredContacts.filter(contact => 
        contact.firstName.toLowerCase().includes(searchTerm) ||
        contact.lastName.toLowerCase().includes(searchTerm) ||
        contact.company.toLowerCase().includes(searchTerm) ||
        contact.title.toLowerCase().includes(searchTerm) ||
        (contact.recruitmentNeeds && contact.recruitmentNeeds.toLowerCase().includes(searchTerm)) ||
        (contact.missions && contact.missions.some(mission => mission.toLowerCase().includes(searchTerm)))
      );
    }
    
    // Filtrage par secteur
    if (filters.sector) {
      filteredContacts = filteredContacts.filter(contact => 
        contact.sector.toLowerCase() === filters.sector.toLowerCase()
      );
    }
    
    // Filtrage par rôle
    if (filters.role) {
      filteredContacts = filteredContacts.filter(contact => 
        contact.role.toLowerCase() === filters.role.toLowerCase()
      );
    }
    
    // Filtrage par pays
    if (filters.country) {
      filteredContacts = filteredContacts.filter(contact => 
        contact.country.toLowerCase() === filters.country.toLowerCase()
      );
    }
    
    // Filtrage par ville
    if (filters.city) {
      filteredContacts = filteredContacts.filter(contact => 
        contact.city.toLowerCase() === filters.city.toLowerCase()
      );
    }
    
    return of(filteredContacts);
  }

  getContactById(id: string): Observable<Contact | undefined> {
    const contact = this.mockContacts.find(c => c.id === id);
    return of(contact);
  }

  getAvailableSectors(): Observable<string[]> {
    const sectors = [...new Set(this.mockContacts.map(contact => contact.sector))];
    return of(sectors);
  }

  getAvailableRoles(): Observable<string[]> {
    const roles = [...new Set(this.mockContacts.map(contact => contact.role))];
    return of(roles);
  }

  getAvailableCountries(): Observable<string[]> {
    const countries = [...new Set(this.mockContacts.map(contact => contact.country))];
    return of(countries);
  }

  getAvailableCities(): Observable<string[]> {
    const cities = [...new Set(this.mockContacts.map(contact => contact.city))];
    return of(cities);
  }
}
