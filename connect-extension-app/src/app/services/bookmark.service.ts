import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { BookmarkList, BookmarkState, initialBookmarkState } from '../models/bookmark.model';

/**
 * Service de gestion des listes de favoris
 * Ce service permet de créer, modifier et supprimer des listes de favoris
 * ainsi que d'ajouter ou retirer des consultants de ces listes
 */
@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  // Utilisation de localStorage pour persister les données entre les sessions
  private readonly STORAGE_KEY = 'fastconnect_bookmarks';
  
  // Subject pour le stockage de l'état et la notification des observateurs
  private bookmarkState = new BehaviorSubject<BookmarkState>(initialBookmarkState);
  
  constructor() {
    // Charger les données depuis le localStorage au démarrage
    this.loadFromStorage();
    
    // Pour le débogage uniquement
    console.log('[BookmarkService] Service initialisé.');
  }
  
  /**
   * Vérifie si un consultant est dans au moins une liste de favoris
   * @param consultantId ID du consultant à vérifier
   * @returns true si le consultant est dans au moins une liste, false sinon
   */
  isConsultantBookmarked(consultantId: string): boolean {
    const lists = this.getLists();
    return lists.some(list => list.consultantIds.includes(consultantId));
  }
  
  /**
   * Récupère la liste complète des listes de favoris
   * @returns Array de BookmarkList
   */
  getBookmarkLists(): BookmarkList[] {
    return this.getLists();
  }
  
  /**
   * Récupère l'état actuel des favoris sous forme d'Observable
   * @returns Observable de l'état des favoris
   */
  getBookmarkState(): Observable<BookmarkState> {
    return this.bookmarkState.asObservable();
  }
  
  /**
   * Récupère la valeur actuelle de l'état des favoris
   * @returns État des favoris
   */
  getCurrentState(): BookmarkState {
    return this.bookmarkState.value;
  }
  
  /**
   * Récupère toutes les listes de favoris
   * @returns Liste d'objets BookmarkList
   */
  getLists(): BookmarkList[] {
    return this.getCurrentState().lists;
  }
  
  /**
   * Récupère une liste de favoris par son identifiant
   * @param listId Identifiant de la liste à récupérer
   * @returns La liste de favoris ou undefined si non trouvée
   */
  getListById(listId: string): BookmarkList | undefined {
    return this.getLists().find(list => list.id === listId);
  }
  
  /**
   * Vérifie si un consultant est présent dans une liste de favoris
   * @param listId Identifiant de la liste
   * @param consultantId Identifiant du consultant
   * @returns true si le consultant est dans la liste, false sinon
   */
  isConsultantInList(listId: string, consultantId: string): boolean {
    const list = this.getListById(listId);
    return list ? list.consultantIds.includes(consultantId) : false;
  }
  
  /**
   * Crée une nouvelle liste de favoris
   * @param name Nom de la liste
   * @param initialConsultantId Identifiant du premier consultant à ajouter (optionnel)
   * @returns Identifiant de la liste créée
   */
  createBookmarkList(name: string, initialConsultantId?: string): string {
    const newList: BookmarkList = {
      id: uuidv4(),
      name: name,
      consultantIds: initialConsultantId ? [initialConsultantId] : [],
      createdAt: new Date(),
      updatedAt: new Date(),
      notificationsEnabled: false,
      newConsultantCount: 0,
      lastViewedAt: null
    };
    
    const currentState = this.getCurrentState();
    const newState: BookmarkState = {
      ...currentState,
      lists: [...currentState.lists, newList]
    };
    
    this.bookmarkState.next(newState);
    this.saveToStorage();
    
    console.log(`[BookmarkService] Liste créée: ${name} (${newList.id})`);
    return newList.id;
  }
  
  /**
   * Renomme une liste de favoris existante
   * @param listId Identifiant de la liste
   * @param newName Nouveau nom de la liste
   * @returns true si la liste a été renommée, false sinon
   */
  renameBookmarkList(listId: string, newName: string): boolean {
    const currentState = this.getCurrentState();
    const listIndex = currentState.lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) {
      console.warn(`[BookmarkService] Tentative de renommer une liste inexistante: ${listId}`);
      return false;
    }
    
    const updatedLists = [...currentState.lists];
    updatedLists[listIndex] = {
      ...updatedLists[listIndex],
      name: newName,
      updatedAt: new Date()
    };
    
    const newState: BookmarkState = {
      ...currentState,
      lists: updatedLists
    };
    
    this.bookmarkState.next(newState);
    this.saveToStorage();
    
    console.log(`[BookmarkService] Liste renommée: ${newName} (${listId})`);
    return true;
  }
  
  /**
   * Supprime une liste de favoris
   * @param listId Identifiant de la liste à supprimer
   * @returns true si la liste a été supprimée, false sinon
   */
  deleteBookmarkList(listId: string): boolean {
    const currentState = this.getCurrentState();
    const listIndex = currentState.lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) {
      console.warn(`[BookmarkService] Tentative de supprimer une liste inexistante: ${listId}`);
      return false;
    }
    
    const updatedLists = currentState.lists.filter(list => list.id !== listId);
    
    // Si la liste supprimée était sélectionnée, désélectionner
    const selectedListId = currentState.selectedListId === listId ? null : currentState.selectedListId;
    
    const newState: BookmarkState = {
      lists: updatedLists,
      selectedListId
    };
    
    this.bookmarkState.next(newState);
    this.saveToStorage();
    
    console.log(`[BookmarkService] Liste supprimée: ${listId}`);
    return true;
  }
  
  /**
   * Ajoute un consultant à une liste de favoris
   * @param listId Identifiant de la liste
   * @param consultantId Identifiant du consultant à ajouter
   * @returns true si le consultant a été ajouté, false sinon
   */
  addConsultantToList(listId: string, consultantId: string): boolean {
    const currentState = this.getCurrentState();
    const listIndex = currentState.lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) {
      console.warn(`[BookmarkService] Tentative d'ajouter à une liste inexistante: ${listId}`);
      return false;
    }
    
    const list = currentState.lists[listIndex];
    
    // Vérifier si le consultant est déjà dans la liste
    if (list.consultantIds.includes(consultantId)) {
      console.log(`[BookmarkService] Le consultant ${consultantId} est déjà dans la liste ${listId}`);
      return false;
    }
    
    const updatedLists = [...currentState.lists];
    const newConsultantCount = list.notificationsEnabled ? list.newConsultantCount + 1 : list.newConsultantCount;
    
    updatedLists[listIndex] = {
      ...list,
      consultantIds: [...list.consultantIds, consultantId],
      newConsultantCount: newConsultantCount,
      updatedAt: new Date()
    };
    
    const newState: BookmarkState = {
      ...currentState,
      lists: updatedLists
    };
    
    this.bookmarkState.next(newState);
    this.saveToStorage();
    
    console.log(`[BookmarkService] Consultant ${consultantId} ajouté à la liste ${listId}`);
    if (list.notificationsEnabled) {
      console.log(`[BookmarkService] Compteur de nouveaux consultants incrémenté pour la liste ${listId}`);
    }
    return true;
  }
  
  /**
   * Retire un consultant d'une liste de favoris
   * @param listId Identifiant de la liste
   * @param consultantId Identifiant du consultant à retirer
   * @returns true si le consultant a été retiré, false sinon
   */
  removeConsultantFromList(listId: string, consultantId: string): boolean {
    const currentState = this.getCurrentState();
    const listIndex = currentState.lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) {
      console.warn(`[BookmarkService] Tentative de retirer d'une liste inexistante: ${listId}`);
      return false;
    }
    
    const list = currentState.lists[listIndex];
    
    // Vérifier si le consultant est dans la liste
    if (!list.consultantIds.includes(consultantId)) {
      console.log(`[BookmarkService] Le consultant ${consultantId} n'est pas dans la liste ${listId}`);
      return false;
    }
    
    const updatedLists = [...currentState.lists];
    updatedLists[listIndex] = {
      ...list,
      consultantIds: list.consultantIds.filter(id => id !== consultantId),
      updatedAt: new Date()
    };
    
    const newState: BookmarkState = {
      ...currentState,
      lists: updatedLists
    };
    
    this.bookmarkState.next(newState);
    this.saveToStorage();
    
    console.log(`[BookmarkService] Consultant ${consultantId} retiré de la liste ${listId}`);
    return true;
  }
  
  /**
   * Sélectionne une liste de favoris
   * @param listId Identifiant de la liste à sélectionner, ou null pour désélectionner
   */
  selectList(listId: string | null): void {
    const currentState = this.getCurrentState();
    
    // Si on tente de sélectionner une liste qui n'existe pas, annuler
    if (listId !== null && !this.getListById(listId)) {
      console.warn(`[BookmarkService] Tentative de sélectionner une liste inexistante: ${listId}`);
      return;
    }
    
    if (currentState.selectedListId === listId) {
      console.log(`[BookmarkService] La liste ${listId} est déjà sélectionnée`);
      return;
    }
    
    const newState: BookmarkState = {
      ...currentState,
      selectedListId: listId
    };
    
    this.bookmarkState.next(newState);
    this.saveToStorage();
    
    console.log(`[BookmarkService] Liste sélectionnée: ${listId}`);
  }
  
  /**
   * Sauvegarde l'état actuel dans le localStorage
   */
  private saveToStorage(): void {
    try {
      const stateToSave = this.getCurrentState();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stateToSave));
      console.log('[BookmarkService] État sauvegardé dans le localStorage');
    } catch (error) {
      console.error('[BookmarkService] Erreur lors de la sauvegarde dans le localStorage:', error);
    }
  }
  
  /**
   * Charge l'état depuis le localStorage
   */
  private loadFromStorage(): void {
    try {
      const storedState = localStorage.getItem(this.STORAGE_KEY);
      
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        
        // Convertir les dates string en objets Date
        const listsWithDates = parsedState.lists.map((list: any) => ({
          ...list,
          createdAt: new Date(list.createdAt),
          updatedAt: new Date(list.updatedAt),
          lastViewedAt: list.lastViewedAt ? new Date(list.lastViewedAt) : null,
          // Ajouter les nouvelles propriétés si elles n'existent pas
          notificationsEnabled: list.notificationsEnabled !== undefined ? list.notificationsEnabled : false,
          newConsultantCount: list.newConsultantCount !== undefined ? list.newConsultantCount : 0
        }));
        
        const loadedState: BookmarkState = {
          ...parsedState,
          lists: listsWithDates
        };
        
        this.bookmarkState.next(loadedState);
        console.log('[BookmarkService] État chargé depuis le localStorage');
      } else {
        console.log('[BookmarkService] Aucun état trouvé dans le localStorage, utilisation de l\'état initial');
      }
    } catch (error) {
      console.error('[BookmarkService] Erreur lors du chargement depuis le localStorage:', error);
      // En cas d'erreur, utiliser l'état initial
      this.bookmarkState.next(initialBookmarkState);
    }
  }
  
  /**
   * Active ou désactive les notifications pour une liste
   * @param listId Identifiant de la liste
   * @param enabled Nouvel état des notifications (true = activées, false = désactivées)
   * @returns true si l'opération a réussi, false sinon
   */
  toggleNotifications(listId: string, enabled: boolean): boolean {
    const currentState = this.getCurrentState();
    const listIndex = currentState.lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) {
      console.warn(`[BookmarkService] Tentative de modifier les notifications d'une liste inexistante: ${listId}`);
      return false;
    }
    
    const list = currentState.lists[listIndex];
    
    // Si l'état est déjà celui demandé, ne rien faire
    if (list.notificationsEnabled === enabled) {
      return true;
    }
    
    const updatedLists = [...currentState.lists];
    updatedLists[listIndex] = {
      ...list,
      notificationsEnabled: enabled,
      updatedAt: new Date()
    };
    
    const newState: BookmarkState = {
      ...currentState,
      lists: updatedLists
    };
    
    this.bookmarkState.next(newState);
    this.saveToStorage();
    
    console.log(`[BookmarkService] Notifications ${enabled ? 'activées' : 'désactivées'} pour la liste ${listId}`);
    return true;
  }
  
  /**
   * Incrémente le compteur de nouveaux consultants pour une liste
   * @param listId Identifiant de la liste
   * @returns true si l'opération a réussi, false sinon
   */
  incrementNewConsultantCount(listId: string): boolean {
    const currentState = this.getCurrentState();
    const listIndex = currentState.lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) {
      console.warn(`[BookmarkService] Tentative d'incrémenter le compteur d'une liste inexistante: ${listId}`);
      return false;
    }
    
    const list = currentState.lists[listIndex];
    
    // N'incrémenter que si les notifications sont activées
    if (!list.notificationsEnabled) {
      return false;
    }
    
    const updatedLists = [...currentState.lists];
    updatedLists[listIndex] = {
      ...list,
      newConsultantCount: list.newConsultantCount + 1,
      updatedAt: new Date()
    };
    
    const newState: BookmarkState = {
      ...currentState,
      lists: updatedLists
    };
    
    this.bookmarkState.next(newState);
    this.saveToStorage();
    
    console.log(`[BookmarkService] Compteur de nouveaux consultants incrémenté pour la liste ${listId}`);
    return true;
  }
  
  /**
   * Réinitialise le compteur de nouveaux consultants pour une liste
   * et met à jour la date de dernière consultation
   * @param listId Identifiant de la liste
   * @returns true si l'opération a réussi, false sinon
   */
  resetNewConsultantCount(listId: string): boolean {
    const currentState = this.getCurrentState();
    const listIndex = currentState.lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) {
      console.warn(`[BookmarkService] Tentative de réinitialiser le compteur d'une liste inexistante: ${listId}`);
      return false;
    }
    
    const list = currentState.lists[listIndex];
    
    // Si le compteur est déjà à 0, mettre à jour uniquement la date de dernière consultation
    if (list.newConsultantCount === 0) {
      const updatedLists = [...currentState.lists];
      updatedLists[listIndex] = {
        ...list,
        lastViewedAt: new Date()
      };
      
      const newState: BookmarkState = {
        ...currentState,
        lists: updatedLists
      };
      
      this.bookmarkState.next(newState);
      this.saveToStorage();
      
      return true;
    }
    
    const updatedLists = [...currentState.lists];
    updatedLists[listIndex] = {
      ...list,
      newConsultantCount: 0,
      lastViewedAt: new Date()
    };
    
    const newState: BookmarkState = {
      ...currentState,
      lists: updatedLists
    };
    
    this.bookmarkState.next(newState);
    this.saveToStorage();
    
    console.log(`[BookmarkService] Compteur de nouveaux consultants réinitialisé pour la liste ${listId}`);
    return true;
  }

  /**
   * Réinitialise toutes les listes de favoris (pour le débogage)
   */
  resetAllBookmarks(): void {
    this.bookmarkState.next(initialBookmarkState);
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('[BookmarkService] Toutes les listes de favoris ont été réinitialisées');
  }
}