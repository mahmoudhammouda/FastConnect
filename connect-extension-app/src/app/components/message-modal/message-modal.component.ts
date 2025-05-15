import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Consultant } from '../../models/consultant.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MessageModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() message: string = '';
  @Input() title: string = 'Message';
  @Input() consultant: Consultant | null = null;
  @Input() senderType: 'consultant' | 'recruiter' = 'consultant';
  
  @Output() close = new EventEmitter<void>();
  @Output() bookmarkToggle = new EventEmitter<number>();
  
  sanitizedMessage: SafeHtml = '';
  isBookmarked = false;
  
  constructor(private sanitizer: DomSanitizer) {}
  
  ngOnInit(): void {
    this.sanitizeMessage();
  }
  
  ngOnChanges(): void {
    // Recalcul du message à chaque changement des inputs
    this.sanitizeMessage();
    // Note: nous devons recevoir le statut de bookmark depuis le composant parent
    // car il n'est pas dans le modèle Consultant
  }
  
  sanitizeMessage(): void {
    if (this.message) {
      // Convertir les URLs en liens cliquables
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const withLinks = this.message.replace(urlRegex, '<a href="$1" target="_blank" class="text-blue-600 hover:underline">$1</a>');
      
      // Convertir les retours à la ligne en balises <br>
      const withLineBreaks = withLinks.replace(/\n/g, '<br>');
      
      this.sanitizedMessage = this.sanitizer.bypassSecurityTrustHtml(withLineBreaks);
    }
  }
  
  closeModal(event: MouseEvent): void {
    console.log('[MessageModal] closeModal appelé, source de l\'\u00e9vénement:', event.target);
    console.log('[MessageModal] closeModal - État avant émission:', {
      isOpen: this.isOpen,
      hasConsultant: !!this.consultant,
      consultantId: this.consultant?.id,
      eventType: event.type
    });
    
    // Arrêter la propagation avant d'émettre l'événement
    event.preventDefault();
    event.stopPropagation();
    
    // Émettre l'événement de fermeture
    this.close.emit();
    console.log('[MessageModal] closeModal - Événement close émis');
  }
  
  stopPropagation(event: MouseEvent): void {
    console.log('[MessageModal] stopPropagation appelé, source de l\'\u00e9vénement:', event.target);
    console.log('[MessageModal] stopPropagation - Type d\'\u00e9vénement:', event.type);
    // Arrêter complètement la propagation de tous les événements
    event.preventDefault();
    event.stopPropagation();
  }
  
  toggleBookmark(event: MouseEvent): void {
    event.stopPropagation();
    if (this.consultant) {
      // Convertir l'ID string en nombre si nécessaire, ou émettre l'ID tel quel
      this.bookmarkToggle.emit(Number(this.consultant.id) || 0);
      this.isBookmarked = !this.isBookmarked;
    }
  }
  
  /**
   * Obtient le libellé de disponibilité selon le statut
   */
  getAvailabilityLabel(status: number): string {
    switch(status) {
      case 0:
        return 'Disponible immédiatement';
      case 1:
        return 'Disponible prochainement';
      case 2:
        return 'Non disponible';
      default:
        return 'Statut inconnu';
    }
  }
  
  /**
   * Obtient le libellé d'expérience selon le niveau
   * Identique à la méthode utilisée dans le ConsultantCardComponent
   */
  getExperienceLabel(experience: string): string {
    if (experience === 'less_than_3') return 'Junior';
    if (experience === 'between_3_and_10') return 'Confirmé';
    return 'Senior';
  }
  
  /**
   * Obtient le nombre de barres d'expérience à afficher selon le niveau
   * Identique à la méthode utilisée dans le ConsultantCardComponent
   */
  getSeniorityBars(experience: string): number {
    if (experience === 'less_than_3') return 1;
    if (experience === 'between_3_and_10') return 2;
    return 3;
  }
  
  openEmail(event: MouseEvent): void {
    event.stopPropagation();
    if (this.consultant?.email) {
      window.open(`mailto:${this.consultant.email}`, '_blank');
    }
  }
  
  openPhone(event: MouseEvent): void {
    event.stopPropagation();
    if (this.consultant?.phone) {
      window.open(`tel:${this.consultant.phone}`, '_blank');
    }
  }
  
  openLinkedIn(event: MouseEvent): void {
    event.stopPropagation();
    if (this.consultant?.linkedinUrl) {
      window.open(this.consultant.linkedinUrl, '_blank');
    }
  }
  
  hasContactInfo(): boolean {
    return !!(this.consultant?.email || this.consultant?.phone || this.consultant?.linkedinUrl);
  }
  
  /**
   * Retourne un tableau des emplacements/localisations du consultant
   * @param location La chaîne de localisation à diviser
   * @returns Un tableau de chaînes représentant les emplacements
   */
  getLocations(location: string | undefined): string[] {
    if (!location) return [];
    
    // Diviser par virgules pour obtenir un tableau de localisations
    return location.split(',').map(loc => loc.trim()).filter(loc => loc.length > 0);
  }
  
  /**
   * Détermine si une localisation est pour du travail à distance
   * @param location La localisation à vérifier
   * @returns true si c'est pour du travail à distance, false sinon
   */
  isRemoteLocation(location: string): boolean {
    return location.toLowerCase().includes('remote') || 
           location.toLowerCase().includes('à distance') || 
           location.toLowerCase().includes('télétravail');
  }
  
  /**
   * Détecte le pays à partir d'une localisation
   * @param location La localisation à analyser
   * @returns Un objet contenant le pays et son drapeau emoji
   */
  getCountryInfo(location: string): { country: string, flag: string } {
    const lowerLocation = location.toLowerCase();
    
    // Mapping des pays avec leurs drapeaux
    const countries: { [key: string]: { country: string, flag: string } } = {
      'france': { country: 'France', flag: '🇫🇷' },
      'belgique': { country: 'Belgique', flag: '🇧🇪' },
      'suisse': { country: 'Suisse', flag: '🇨🇭' },
      'luxembourg': { country: 'Luxembourg', flag: '🇱🇺' },
      'canada': { country: 'Canada', flag: '🇨🇦' },
      'etats-unis': { country: 'États-Unis', flag: '🇺🇸' },
      'royaume-uni': { country: 'Royaume-Uni', flag: '🇬🇧' },
      'allemagne': { country: 'Allemagne', flag: '🇩🇪' },
      'espagne': { country: 'Espagne', flag: '🇪🇸' },
      'italie': { country: 'Italie', flag: '🇮🇹' },
      'portugal': { country: 'Portugal', flag: '🇵🇹' },
      'pays-bas': { country: 'Pays-Bas', flag: '🇳🇱' },
      'remote': { country: 'Remote', flag: '💻' }, // Ordinateur pour remote
    };
    
    // Vérifier si la localisation contient le nom d'un pays connu
    for (const key in countries) {
      if (lowerLocation.includes(key)) {
        return countries[key];
      }
    }
    
    // Si le pays n'est pas reconnu, retourner France par défaut
    return { country: 'France', flag: '🇫🇷' };
  }
  
  /**
   * Groupe les localisations par pays
   * @param locations Tableau des localisations
   * @returns Un objet avec les pays comme clés et les villes comme valeurs
   */
  groupLocationsByCountry(locations: string[]): { [country: string]: { flag: string, cities: string[] } } {
    const groupedLocations: { [country: string]: { flag: string, cities: string[] } } = {};
    
    // Pour chaque localisation, extraire le pays et la ville
    locations.forEach(location => {
      if (this.isRemoteLocation(location)) {
        // Gérer le cas spécial du travail à distance
        const key = 'Remote';
        if (!groupedLocations[key]) {
          groupedLocations[key] = { flag: '💻', cities: [] };
        }
        groupedLocations[key].cities.push(location);
        return;
      }
      
      const countryInfo = this.getCountryInfo(location);
      const countryName = countryInfo.country;
      
      if (!groupedLocations[countryName]) {
        groupedLocations[countryName] = { flag: countryInfo.flag, cities: [] };
      }
      
      // Ajouter la localisation comme ville si elle n'est pas identique au pays
      if (location.toLowerCase() !== countryName.toLowerCase()) {
        groupedLocations[countryName].cities.push(location);
      }
    });
    
    return groupedLocations;
  }
  
  /**
   * Helper pour obtenir les clés d'un objet (utilisé pour l'itération dans le template)
   * @param obj L'objet dont on veut extraire les clés
   * @returns Un tableau contenant les clés de l'objet
   */
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }
  
  /**
   * Convertit le niveau d'expérience en nombre d'années
   * @param experience Le niveau d'expérience du consultant
   * @returns Une chaîne formatée indiquant le nombre d'années d'expérience
   */
  getExperienceYears(experience: string): string {
    if (experience === 'less_than_3') {
      return '1-3 ans';
    } else if (experience === 'between_3_and_10') {
      return '3-10 ans';
    } else if (experience === 'more_than_10') {
      return '+10 ans';
    }
    return '0-1 an';
  }
  
  /**
   * Fournit les types de contrats recherchés par le consultant
   * Note: Cette méthode utilise des données fictives car cette information
   * n'est pas actuellement disponible dans le modèle Consultant
   * @returns Les types de contrats recherchés
   */
  getContractTypes(): string {
    // Pour l'instant, nous renvoyons des données fictives
    // Dans un environnement réel, cela viendrait du modèle du consultant
    return 'CDI, Freelance';
  }
  
  /**
   * Détermine la date de disponibilité du consultant en fonction de son statut
   * @param availability Le statut de disponibilité du consultant
   * @returns Une chaîne indiquant la date de disponibilité
   */
  getAvailabilityDate(availability: number): string {
    const currentDate = new Date();
    
    switch (availability) {
      case 0: // Disponible immédiatement
        return 'Immédiate';
      case 1: // Disponible prochainement
        // Disponible dans 1 mois (exemple)
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + 1);
        return nextMonth.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
      case 2: // Non disponible
        // Disponible dans 3 mois (exemple)
        const inThreeMonths = new Date(currentDate);
        inThreeMonths.setMonth(currentDate.getMonth() + 3);
        return inThreeMonths.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
      default:
        return 'Non spécifiée';
    }
  }
  
  isContactAvailable(type: 'email' | 'phone' | 'linkedin'): boolean {
    if (!this.consultant) return false;
    
    switch (type) {
      case 'email':
        // Nous considérons que l'email est valide si présent
        // Dans un contexte réel, vous devriez avoir un flag de validation
        return !!this.consultant.email;
      case 'phone':
        return !!this.consultant.phone;
      case 'linkedin':
        return !!this.consultant.linkedinUrl;
      default:
        return false;
    }
  }
}
