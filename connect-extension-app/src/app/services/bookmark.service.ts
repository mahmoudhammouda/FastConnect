import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookmarkList, BookmarkState } from '../models/bookmark.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  // Clé pour le stockage local
  private readonly STORAGE_KEY = 'fastconnect_bookmarks';
  
  // État initial des favoris
  private initialState: BookmarkState = {
    lists: [],
    isAddingToList: false
  };
  
  // Subject pour gérer l'état des favoris
  private bookmarkState = new BehaviorSubject<BookmarkState>(this.initialState);
  
  constructor() {
    this.loadFromLocalStorage();
  }
  
  /**
   * Obtenir l'état actuel des favoris sous forme d'Observable
   */
  getBookmarkState(): Observable<BookmarkState> {
    return this.bookmarkState.asObservable();
  }
  
  /**
   * Obtenir toutes les listes de favoris
   */
  getBookmarkLists(): BookmarkList[] {
    return this.bookmarkState.value.lists;
  }
  
  /**
   * Créer une nouvelle liste de favoris
   * @param name Nom de la liste
   * @param consultantId ID du consultant à ajouter initialement (optionnel)
   * @returns ID de la nouvelle liste
   */
  createBookmarkList(name: string, consultantId?: string): string {
    const newList: BookmarkList = {
      id: uuidv4(),
      name,
      consultantIds: consultantId ? [consultantId] : [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const currentState = this.bookmarkState.value;
    const updatedState: BookmarkState = {
      ...currentState,
      lists: [...currentState.lists, newList],
      isAddingToList: false,
      currentConsultantId: undefined
    };
    
    this.bookmarkState.next(updatedState);
    this.saveToLocalStorage();
    
    return newList.id;
  }
  
  /**
   * Ajouter un consultant à une liste de favoris existante
   * @param listId ID de la liste
   * @param consultantId ID du consultant
   * @returns true si l'ajout a réussi, false sinon
   */
  addConsultantToList(listId: string, consultantId: string): boolean {
    const currentState = this.bookmarkState.value;
    const listIndex = currentState.lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) return false;
    
    // Vérifier si le consultant est déjà dans la liste
    if (currentState.lists[listIndex].consultantIds.includes(consultantId)) {
      return true; // Déjà dans la liste, on considère que c'est un succès
    }
    
    // Créer une copie mise à jour de la liste
    const updatedList = {
      ...currentState.lists[listIndex],
      consultantIds: [...currentState.lists[listIndex].consultantIds, consultantId],
      updatedAt: new Date()
    };
    
    // Créer une copie mise à jour de toutes les listes
    const updatedLists = [...currentState.lists];
    updatedLists[listIndex] = updatedList;
    
    // Mettre à jour l'état
    const updatedState: BookmarkState = {
      ...currentState,
      lists: updatedLists,
      isAddingToList: false,
      currentConsultantId: undefined
    };
    
    this.bookmarkState.next(updatedState);
    this.saveToLocalStorage();
    
    return true;
  }
  
  /**
   * Retirer un consultant d'une liste de favoris
   * @param listId ID de la liste
   * @param consultantId ID du consultant
   * @returns true si la suppression a réussi, false sinon
   */
  removeConsultantFromList(listId: string, consultantId: string): boolean {
    const currentState = this.bookmarkState.value;
    const listIndex = currentState.lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) return false;
    
    // Vérifier si le consultant est dans la liste
    if (!currentState.lists[listIndex].consultantIds.includes(consultantId)) {
      return false; // Pas dans la liste
    }
    
    // Créer une copie mise à jour de la liste sans le consultant
    const updatedList = {
      ...currentState.lists[listIndex],
      consultantIds: currentState.lists[listIndex].consultantIds.filter(id => id !== consultantId),
      updatedAt: new Date()
    };
    
    // Créer une copie mise à jour de toutes les listes
    const updatedLists = [...currentState.lists];
    updatedLists[listIndex] = updatedList;
    
    // Mettre à jour l'état
    const updatedState: BookmarkState = {
      ...currentState,
      lists: updatedLists
    };
    
    this.bookmarkState.next(updatedState);
    this.saveToLocalStorage();
    
    return true;
  }
  
  /**
   * Supprimer une liste de favoris
   * @param listId ID de la liste à supprimer
   * @returns true si la suppression a réussi, false sinon
   */
  deleteBookmarkList(listId: string): boolean {
    const currentState = this.bookmarkState.value;
    
    if (!currentState.lists.some(list => list.id === listId)) {
      return false; // Liste inexistante
    }
    
    // Filtrer la liste à supprimer
    const updatedLists = currentState.lists.filter(list => list.id !== listId);
    
    // Mettre à jour l'état
    const updatedState: BookmarkState = {
      ...currentState,
      lists: updatedLists
    };
    
    this.bookmarkState.next(updatedState);
    this.saveToLocalStorage();
    
    return true;
  }
  
  /**
   * Définir l'état d'ajout à une liste
   * @param isAdding true si on est en train d'ajouter, false sinon
   * @param consultantId ID du consultant à ajouter (ou undefined si on annule)
   */
  setAddingToList(isAdding: boolean, consultantId?: string): void {
    const currentState = this.bookmarkState.value;
    const updatedState: BookmarkState = {
      ...currentState,
      isAddingToList: isAdding,
      currentConsultantId: consultantId
    };
    
    this.bookmarkState.next(updatedState);
  }
  
  /**
   * Vérifier si un consultant est présent dans une liste spécifique
   * @param listId ID de la liste
   * @param consultantId ID du consultant
   * @returns true si le consultant est dans la liste, false sinon
   */
  isConsultantInList(listId: string, consultantId: string): boolean {
    const currentState = this.bookmarkState.value;
    const list = currentState.lists.find(l => l.id === listId);
    
    if (!list) return false;
    
    return list.consultantIds.includes(consultantId);
  }
  
  /**
   * Vérifier si un consultant est présent dans au moins une liste
   * @param consultantId ID du consultant
   * @returns true si le consultant est dans au moins une liste, false sinon
   */
  isConsultantBookmarked(consultantId: string): boolean {
    const currentState = this.bookmarkState.value;
    return currentState.lists.some(list => list.consultantIds.includes(consultantId));
  }
  
  /**
   * Charger les favoris depuis le stockage local
   */
  private loadFromLocalStorage(): void {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        
        // Convertir les dates de chaînes en objets Date
        const lists = parsedData.lists.map((list: any) => ({
          ...list,
          createdAt: new Date(list.createdAt),
          updatedAt: new Date(list.updatedAt)
        }));
        
        this.bookmarkState.next({
          ...this.initialState,
          lists
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
    }
  }
  
  /**
   * Sauvegarder les favoris dans le stockage local
   */
  private saveToLocalStorage(): void {
    try {
      const dataToSave = JSON.stringify(this.bookmarkState.value);
      localStorage.setItem(this.STORAGE_KEY, dataToSave);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des favoris:', error);
    }
  }
}
