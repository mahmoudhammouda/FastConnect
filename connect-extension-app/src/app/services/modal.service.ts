import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Interface pour les callbacks de modal
export interface ModalCallbacks {
  open: () => void;
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
  modalBackdropVisibleSubject = new BehaviorSubject<boolean>(false);
  
  // Registre des modals
  private modals: { [key: string]: ModalCallbacks } = {};
  
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
   * Ferme tous les modals
   */
  closeAllModals(): void {
    this.closeLoginModal();
    
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