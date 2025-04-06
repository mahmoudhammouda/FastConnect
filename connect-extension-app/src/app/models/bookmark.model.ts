export interface BookmarkList {
  id: string;             // Identifiant unique de la liste
  name: string;           // Nom de la liste de favoris
  consultantIds: string[]; // IDs des consultants dans cette liste
  createdAt: Date;        // Date de création de la liste
  updatedAt: Date;        // Date de dernière modification
}

export interface BookmarkState {
  lists: BookmarkList[];  // Toutes les listes de favoris
  isAddingToList: boolean; // État pour savoir si on est en train d'ajouter à une liste
  currentConsultantId?: string; // ID du consultant en cours d'ajout
}
