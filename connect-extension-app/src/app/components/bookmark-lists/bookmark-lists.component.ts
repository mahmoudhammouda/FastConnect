import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookmarkService } from '../../services/bookmark.service';
import { BookmarkList } from '../../models/bookmark.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookmark-lists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookmark-lists.component.html',
  styleUrls: ['./bookmark-lists.component.scss']
})
export class BookmarkListsComponent implements OnInit, OnDestroy {
  // Listes de favoris
  bookmarkLists: BookmarkList[] = [];
  
  // ID de la liste sélectionnée
  selectedListId: string | null = null;
  
  // État du mode édition pour les noms de liste
  editingListId: string | null = null;
  newListName: string = '';
  
  // Gestion de la création d'une nouvelle liste
  isCreatingNewList: boolean = false;
  newListTitle: string = '';
  
  // Gestion des consultants par liste
  consultantCounts: { [listId: string]: number } = {};
  
  // Subscription
  private subscription: Subscription = new Subscription();
  
  constructor(
    private bookmarkService: BookmarkService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // S'abonner aux changements d'état des favoris
    this.subscription.add(
      this.bookmarkService.getBookmarkState().subscribe(state => {
        this.bookmarkLists = state.lists;
        this.selectedListId = state.selectedListId;
        
        // Calculer le nombre de consultants par liste
        this.updateConsultantCounts();
      })
    );
  }
  
  ngOnDestroy(): void {
    // Nettoyer les abonnements
    this.subscription.unsubscribe();
  }
  
  /**
   * Met à jour le compteur de consultants pour chaque liste
   */
  private updateConsultantCounts(): void {
    const counts: { [listId: string]: number } = {};
    
    this.bookmarkLists.forEach(list => {
      counts[list.id] = list.consultantIds.length;
    });
    
    this.consultantCounts = counts;
  }
  
  /**
   * Sélectionne une liste de favoris
   */
  selectList(listId: string): void {
    if (this.editingListId) {
      this.cancelEditing();
    }
    
    this.bookmarkService.selectList(listId);
  }
  
  /**
   * Désélectionne la liste actuellement sélectionnée
   */
  clearSelection(): void {
    this.bookmarkService.selectList(null);
  }
  
  /**
   * Entre en mode édition pour une liste
   */
  startEditing(list: BookmarkList, event: Event): void {
    event.stopPropagation();
    this.editingListId = list.id;
    this.newListName = list.name;
    
    // Focus sur le champ de saisie après le rendu
    setTimeout(() => {
      const input = document.getElementById(`edit-list-${list.id}`);
      if (input) {
        input.focus();
      }
    }, 0);
  }
  
  /**
   * Enregistre le nouveau nom de la liste
   */
  saveNewName(listId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (this.newListName.trim() === '') {
      return;
    }
    
    this.bookmarkService.renameBookmarkList(listId, this.newListName.trim());
    this.editingListId = null;
    this.newListName = '';
  }
  
  /**
   * Annule l'édition du nom de liste
   */
  cancelEditing(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    this.editingListId = null;
    this.newListName = '';
  }
  
  /**
   * Entre en mode création de nouvelle liste
   */
  startCreatingList(): void {
    this.isCreatingNewList = true;
    this.newListTitle = '';
    
    // Focus sur le champ de saisie après le rendu
    setTimeout(() => {
      const input = document.getElementById('new-list-title');
      if (input) {
        input.focus();
      }
    }, 0);
  }
  
  /**
   * Crée une nouvelle liste de favoris
   */
  createNewList(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    
    if (this.newListTitle.trim() === '') {
      return;
    }
    
    const listId = this.bookmarkService.createBookmarkList(this.newListTitle.trim());
    this.isCreatingNewList = false;
    this.newListTitle = '';
    
    // Sélectionner automatiquement la nouvelle liste
    this.bookmarkService.selectList(listId);
  }
  
  /**
   * Annule la création d'une nouvelle liste
   */
  cancelCreatingList(): void {
    this.isCreatingNewList = false;
    this.newListTitle = '';
  }
  
  /**
   * Supprime une liste de favoris
   */
  deleteList(listId: string, event: Event): void {
    event.stopPropagation();
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette liste de favoris ?')) {
      this.bookmarkService.deleteBookmarkList(listId);
    }
  }
  
  /**
   * Vérifie si une liste est vide (aucun consultant)
   */
  isListEmpty(listId: string): boolean {
    return this.consultantCounts[listId] === 0;
  }
  
  /**
   * Empêche la propagation d'un événement
   */
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
  
  /**
   * Affiche les consultants d'une liste de favoris
   * Cette méthode sélectionne la liste et navigue vers la page des consultants
   * @param listId Identifiant de la liste
   * @param event Événement de clic
   */
  viewConsultants(listId: string, event: Event): void {
    event.stopPropagation();
    
    // Réinitialiser le compteur de nouveaux consultants
    this.bookmarkService.resetNewConsultantCount(listId);
    
    // Sélectionner la liste
    this.bookmarkService.selectList(listId);
    
    // Naviguer vers la page des consultants
    this.router.navigate(['/']);
  }
  
  /**
   * Active ou désactive les notifications pour une liste
   * @param listId Identifiant de la liste
   * @param event Événement de clic
   */
  toggleNotifications(listId: string, event: Event): void {
    event.stopPropagation();
    
    const list = this.bookmarkLists.find(l => l.id === listId);
    if (!list) return;
    
    // Inverser l'état des notifications
    this.bookmarkService.toggleNotifications(listId, !list.notificationsEnabled);
  }
  
  /**
   * Vérifie si une liste a de nouveaux consultants
   * @param listId Identifiant de la liste
   * @returns Vrai si la liste a de nouveaux consultants, faux sinon
   */
  hasNewConsultants(listId: string): boolean {
    const list = this.bookmarkLists.find(l => l.id === listId);
    return list ? list.newConsultantCount > 0 : false;
  }
  
  /**
   * Obtient le nombre de nouveaux consultants dans une liste
   * @param listId Identifiant de la liste
   * @returns Nombre de nouveaux consultants
   */
  getNewConsultantCount(listId: string): number {
    const list = this.bookmarkLists.find(l => l.id === listId);
    return list ? list.newConsultantCount : 0;
  }
}