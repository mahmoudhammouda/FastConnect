import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service pour gérer l'affichage des modals dans l'application
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private loginModalVisibleSubject = new BehaviorSubject<boolean>(false);
  private modalBackdropVisibleSubject = new BehaviorSubject<boolean>(false);
  
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
   * Ouvre le modal de connexion
   */
  openLoginModal(): void {
    this.loginModalVisibleSubject.next(true);
    this.modalBackdropVisibleSubject.next(true);
  }

  /**
   * Ferme le modal de connexion
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
    // Ajouter d'autres fermetures de modals ici si nécessaire
  }
}