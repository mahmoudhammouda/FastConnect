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
   */
  getExperienceLabel(level: any): string {
    // Traiter différents formats possibles de l'expérience
    if (level === 'less_than_3' || level === 0 || level === '0') {
      return 'Junior';
    } else if (level === 'between_3_and_10' || level === 1 || level === '1') {
      return 'Confirmé';
    } else if (level === 'more_than_10' || level === 2 || level === '2') {
      return 'Senior';
    } else {
      // Par défaut, retourner Senior pour éviter tout problème d'affichage
      console.warn('[MessageModal] Format d\'expérience non reconnu:', level);
      return 'Senior';
    }
  }
  
  /**
   * Obtient le nombre de barres d'expérience à afficher selon le niveau
   */
  getSeniorityBars(level: any): number {
    // Traiter différents formats possibles de l'expérience
    if (level === 'less_than_3' || level === 0 || level === '0') {
      return 1;
    } else if (level === 'between_3_and_10' || level === 1 || level === '1') {
      return 2;
    } else if (level === 'more_than_10' || level === 2 || level === '2') {
      return 3;
    } else {
      // Par défaut, afficher 3 barres (Senior) pour éviter tout problème d'affichage
      console.warn('[MessageModal] Format d\'expérience non reconnu pour les barres:', level);
      return 3;
    }
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
