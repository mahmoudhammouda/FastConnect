/**
 * Interface pour une liste de favoris
 */
export interface BookmarkList {
  id: string;
  name: string;
  consultantIds: string[];
  createdAt: Date;
  updatedAt: Date;
  notificationsEnabled: boolean;
  newConsultantCount: number;
  lastViewedAt: Date | null;
}

/**
 * Interface pour l'état global des favoris
 */
export interface BookmarkState {
  lists: BookmarkList[];
  selectedListId: string | null;
}

/**
 * État initial des favoris
 */
export const initialBookmarkState: BookmarkState = {
  lists: [],
  selectedListId: null
};