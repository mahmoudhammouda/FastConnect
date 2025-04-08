/**
 * Interface pour une alerte automatique basée sur des critères
 */
export interface Alert {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  criteria: AlertCriteria;
  newConsultantCount: number;
  lastViewedAt: Date | null;
}

/**
 * Interface pour les critères d'une alerte
 */
export interface AlertCriteria {
  experience: string[];
  availability: string[];
  location: string[];
  skills: string[];
}

/**
 * Interface pour l'état global des alertes
 */
export interface AlertState {
  alerts: Alert[];
  selectedAlertId: string | null;
}

/**
 * État initial des alertes
 */
export const initialAlertState: AlertState = {
  alerts: [],
  selectedAlertId: null
};