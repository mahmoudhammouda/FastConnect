import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConsultantAvailability } from '../models/consultant-availability.model';

// Interface pour les callbacks de modal
export interface ModalCallbacks {
  open: () => void;
  close: () => void;
}

// Interface pour les callbacks de modal avec paramètres
export interface ModalDataCallbacks<T> {
  open: (data?: T, readOnly?: boolean) => void;
  close: () => void;
}

/**
 * Service pour gérer l'affichage des modals dans l'application
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private loginModalVisibleSubject = new BehaviorSubject<boolean>(false);
  // Référence au modal addAvailability supprimée
  modalBackdropVisibleSubject = new BehaviorSubject<boolean>(false);
  
  // Registre des modals
  private modals: { [key: string]: ModalCallbacks } = {};
  private dataModals: { [key: string]: any } = {};
  
  // Observable public pour que les composants puissent s'abonner aux changements
  public loginModalVisible$: Observable<boolean> = this.loginModalVisibleSubject.asObservable();
  public modalBackdropVisible$: Observable<boolean> = this.modalBackdropVisibleSubject.asObservable();

  // État actuel du modal
  get isLoginModalVisible(): boolean {
    return this.loginModalVisibleSubject.value;
  }

  get isModalBackdropVisible(): boolean {
    return this.modalBackdropVisibleSubject.value;
  }

  constructor() { }

  /**
   * Enregistre un modal dans le service
   * @param modalId Identifiant unique du modal
   * @param callbacks Fonctions de callback pour ouvrir et fermer le modal
   */
  register(modalId: string, callbacks: ModalCallbacks): void {
    this.modals[modalId] = callbacks;
  }

  /**
   * Ouvre un modal par son identifiant
   * @param modalId Identifiant du modal à ouvrir
   */
  open(modalId: string): void {
    if (this.modals[modalId]) {
      this.modals[modalId].open();
      this.modalBackdropVisibleSubject.next(true);
    } else {
      console.error(`Modal avec ID '${modalId}' n'existe pas`);
    }
  }

  /**
   * Ferme un modal par son identifiant
   * @param modalId Identifiant du modal à fermer
   */
  close(modalId: string): void {
    if (this.modals[modalId]) {
      this.modals[modalId].close();
      this.modalBackdropVisibleSubject.next(false);
    } else {
      console.error(`Modal avec ID '${modalId}' n'existe pas`);
    }
  }

  /**
   * Ouvre le modal de connexion (compatibilité avec le code existant)
   */
  openLoginModal(): void {
    this.loginModalVisibleSubject.next(true);
    this.modalBackdropVisibleSubject.next(true);
  }

  /**
   * Ferme le modal de connexion (compatibilité avec le code existant)
   */
  closeLoginModal(): void {
    this.loginModalVisibleSubject.next(false);
    this.modalBackdropVisibleSubject.next(false);
  }

  /**
   * Enregistre un modal avec données dans le service
   * @param modalId Identifiant unique du modal
   * @param callbacks Fonctions de callback pour ouvrir et fermer le modal
   */
  registerDataModal<T>(modalId: string, callbacks: ModalDataCallbacks<T>): void {
    this.dataModals[modalId] = callbacks;
  }
  
  /**
   * Méthode temporaire qui remplace l'ancien modal d'ajout de disponibilité
   * Cette méthode sera modifiée dans une future étape pour refléter la nouvelle implémentation
   * @param availability Disponibilité à éditer (optionnel)
   * @param readOnly Mode lecture seule (optionnel)
   * @returns Promise qui se résout immédiatement (pour compatibilité)
   */
  openAddAvailabilityModal(availability?: ConsultantAvailability, readOnly = false): Promise<void> {
    console.log('Cette fonctionnalité sera implémentée différemment dans une prochaine étape');
    
    // Si le modal a été enregistré via le système de données dynamiques,
    // on peut toujours essayer de l'appeler pour maintenir la compatibilité
    if (this.dataModals['addAvailability']) {
      try {
        this.dataModals['addAvailability'].open(availability, readOnly);
      } catch (error) {
        console.warn('Le modal addAvailability n\'est plus disponible', error);
      }
    }
    
    // Afficher le backdrop pour compatibilité
    this.modalBackdropVisibleSubject.next(true);
    
    // Retourne une promesse qui se résout immédiatement (pour compatibilité)
    return Promise.resolve();
  }
  
  /**
   * Méthode temporaire qui remplace l'ancien modal d'ajout de disponibilité
   * Cette méthode sera supprimée dans une future étape
   */
  closeAddAvailabilityModal(): void {
    // Ne fait rien, car le modal n'existe plus
  }

  /**
   * Ferme tous les modals
   */
  closeAllModals(): void {
    this.closeLoginModal();
    this.closeAddAvailabilityModal();
    
    // Fermer tous les modals enregistrés
    Object.keys(this.modals).forEach(modalId => {
      try {
        this.modals[modalId].close();
      } catch (error) {
        console.error(`Erreur lors de la fermeture du modal '${modalId}'`, error);
      }
    });
    
    this.modalBackdropVisibleSubject.next(false);
  }
}