import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Alert, AlertCriteria, AlertState, initialAlertState } from '../models/alert.model';

/**
 * Service de gestion des alertes automatiques
 * Ce service permet de créer, modifier et supprimer des alertes automatiques
 * basées sur des critères spécifiques
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // Utilisation de localStorage pour persister les données entre les sessions
  private readonly STORAGE_KEY = 'fastconnect_alerts';
  
  // Subject pour le stockage de l'état et la notification des observateurs
  private alertState = new BehaviorSubject<AlertState>(initialAlertState);
  
  constructor() {
    // Charger les données depuis le localStorage au démarrage
    this.loadFromStorage();
    
    // Pour le débogage et le mockup initial, générer des données d'exemple
    if (this.getAlerts().length === 0) {
      this.createMockAlerts();
    }
    
    console.log('[AlertService] Service initialisé.');
  }
  
  /**
   * Récupère la liste complète des alertes
   * @returns Array de Alert
   */
  getAlerts(): Alert[] {
    return this.getCurrentState().alerts;
  }
  
  /**
   * Récupère l'état actuel des alertes sous forme d'Observable
   * @returns Observable de l'état des alertes
   */
  getAlertState(): Observable<AlertState> {
    return this.alertState.asObservable();
  }
  
  /**
   * Récupère la valeur actuelle de l'état des alertes
   * @returns État des alertes
   */
  getCurrentState(): AlertState {
    return this.alertState.value;
  }
  
  /**
   * Récupère une alerte par son identifiant
   * @param alertId Identifiant de l'alerte à récupérer
   * @returns L'alerte ou undefined si non trouvée
   */
  getAlertById(alertId: string): Alert | undefined {
    return this.getAlerts().find(alert => alert.id === alertId);
  }
  
  /**
   * Crée une nouvelle alerte automatique
   * @param name Nom de l'alerte
   * @param criteria Critères de l'alerte
   * @returns Identifiant de l'alerte créée
   */
  createAlert(name: string, criteria: AlertCriteria): string {
    const newAlert: Alert = {
      id: uuidv4(),
      name: name,
      criteria: criteria,
      createdAt: new Date(),
      updatedAt: new Date(),
      newConsultantCount: 0,
      lastViewedAt: null
    };
    
    const currentState = this.getCurrentState();
    const newState: AlertState = {
      ...currentState,
      alerts: [...currentState.alerts, newAlert]
    };
    
    this.alertState.next(newState);
    this.saveToStorage();
    
    console.log(`[AlertService] Alerte créée: ${name} (${newAlert.id})`);
    return newAlert.id;
  }
  
  /**
   * Met à jour une alerte existante
   * @param alertId Identifiant de l'alerte
   * @param name Nouveau nom de l'alerte
   * @param criteria Nouveaux critères de l'alerte
   * @returns true si l'alerte a été mise à jour, false sinon
   */
  updateAlert(alertId: string, name: string, criteria: AlertCriteria): boolean {
    const currentState = this.getCurrentState();
    const alertIndex = currentState.alerts.findIndex(alert => alert.id === alertId);
    
    if (alertIndex === -1) {
      console.warn(`[AlertService] Tentative de mettre à jour une alerte inexistante: ${alertId}`);
      return false;
    }
    
    const updatedAlerts = [...currentState.alerts];
    updatedAlerts[alertIndex] = {
      ...updatedAlerts[alertIndex],
      name: name,
      criteria: criteria,
      updatedAt: new Date()
    };
    
    const newState: AlertState = {
      ...currentState,
      alerts: updatedAlerts
    };
    
    this.alertState.next(newState);
    this.saveToStorage();
    
    console.log(`[AlertService] Alerte mise à jour: ${name} (${alertId})`);
    return true;
  }
  
  /**
   * Supprime une alerte
   * @param alertId Identifiant de l'alerte à supprimer
   * @returns true si l'alerte a été supprimée, false sinon
   */
  deleteAlert(alertId: string): boolean {
    const currentState = this.getCurrentState();
    const alertIndex = currentState.alerts.findIndex(alert => alert.id === alertId);
    
    if (alertIndex === -1) {
      console.warn(`[AlertService] Tentative de supprimer une alerte inexistante: ${alertId}`);
      return false;
    }
    
    const updatedAlerts = currentState.alerts.filter(alert => alert.id !== alertId);
    
    // Si l'alerte supprimée était sélectionnée, désélectionner
    const selectedAlertId = currentState.selectedAlertId === alertId ? null : currentState.selectedAlertId;
    
    const newState: AlertState = {
      alerts: updatedAlerts,
      selectedAlertId
    };
    
    this.alertState.next(newState);
    this.saveToStorage();
    
    console.log(`[AlertService] Alerte supprimée: ${alertId}`);
    return true;
  }
  
  /**
   * Sélectionne une alerte
   * @param alertId Identifiant de l'alerte à sélectionner, ou null pour désélectionner
   */
  selectAlert(alertId: string | null): void {
    const currentState = this.getCurrentState();
    
    // Si on tente de sélectionner une alerte qui n'existe pas, annuler
    if (alertId !== null && !this.getAlertById(alertId)) {
      console.warn(`[AlertService] Tentative de sélectionner une alerte inexistante: ${alertId}`);
      return;
    }
    
    if (currentState.selectedAlertId === alertId) {
      console.log(`[AlertService] L'alerte ${alertId} est déjà sélectionnée`);
      return;
    }
    
    const newState: AlertState = {
      ...currentState,
      selectedAlertId: alertId
    };
    
    this.alertState.next(newState);
    this.saveToStorage();
    
    console.log(`[AlertService] Alerte sélectionnée: ${alertId}`);
    
    // Si une alerte est sélectionnée, réinitialiser son compteur de nouveaux consultants
    if (alertId) {
      this.resetNewConsultantCount(alertId);
    }
  }
  
  /**
   * Incrémente le compteur de nouveaux consultants pour une alerte
   * @param alertId Identifiant de l'alerte
   * @returns true si l'opération a réussi, false sinon
   */
  incrementNewConsultantCount(alertId: string): boolean {
    const currentState = this.getCurrentState();
    const alertIndex = currentState.alerts.findIndex(alert => alert.id === alertId);
    
    if (alertIndex === -1) {
      console.warn(`[AlertService] Tentative d'incrémenter le compteur d'une alerte inexistante: ${alertId}`);
      return false;
    }
    
    const alert = currentState.alerts[alertIndex];
    
    const updatedAlerts = [...currentState.alerts];
    updatedAlerts[alertIndex] = {
      ...alert,
      newConsultantCount: alert.newConsultantCount + 1,
      updatedAt: new Date()
    };
    
    const newState: AlertState = {
      ...currentState,
      alerts: updatedAlerts
    };
    
    this.alertState.next(newState);
    this.saveToStorage();
    
    console.log(`[AlertService] Compteur de nouveaux consultants incrémenté pour l'alerte ${alertId}`);
    return true;
  }
  
  /**
   * Réinitialise le compteur de nouveaux consultants pour une alerte
   * et met à jour la date de dernière consultation
   * @param alertId Identifiant de l'alerte
   * @returns true si l'opération a réussi, false sinon
   */
  resetNewConsultantCount(alertId: string): boolean {
    const currentState = this.getCurrentState();
    const alertIndex = currentState.alerts.findIndex(alert => alert.id === alertId);
    
    if (alertIndex === -1) {
      console.warn(`[AlertService] Tentative de réinitialiser le compteur d'une alerte inexistante: ${alertId}`);
      return false;
    }
    
    const alert = currentState.alerts[alertIndex];
    
    const updatedAlerts = [...currentState.alerts];
    updatedAlerts[alertIndex] = {
      ...alert,
      newConsultantCount: 0,
      lastViewedAt: new Date()
    };
    
    const newState: AlertState = {
      ...currentState,
      alerts: updatedAlerts
    };
    
    this.alertState.next(newState);
    this.saveToStorage();
    
    console.log(`[AlertService] Compteur de nouveaux consultants réinitialisé pour l'alerte ${alertId}`);
    return true;
  }
  
  /**
   * Sauvegarde l'état actuel dans le localStorage
   */
  private saveToStorage(): void {
    try {
      const stateToSave = this.getCurrentState();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stateToSave));
      console.log('[AlertService] État sauvegardé dans le localStorage');
    } catch (error) {
      console.error('[AlertService] Erreur lors de la sauvegarde dans le localStorage:', error);
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
        const alertsWithDates = parsedState.alerts.map((alert: any) => ({
          ...alert,
          createdAt: new Date(alert.createdAt),
          updatedAt: new Date(alert.updatedAt),
          lastViewedAt: alert.lastViewedAt ? new Date(alert.lastViewedAt) : null
        }));
        
        const loadedState: AlertState = {
          ...parsedState,
          alerts: alertsWithDates
        };
        
        this.alertState.next(loadedState);
        console.log('[AlertService] État chargé depuis le localStorage');
      } else {
        console.log('[AlertService] Aucun état trouvé dans le localStorage, utilisation de l\'état initial');
      }
    } catch (error) {
      console.error('[AlertService] Erreur lors du chargement depuis le localStorage:', error);
      // En cas d'erreur, utiliser l'état initial
      this.alertState.next(initialAlertState);
    }
  }
  
  /**
   * Crée des alertes moquées pour la présentation
   * Cette méthode ne sera utilisée que pour démontrer l'interface
   */
  private createMockAlerts(): void {
    // Exemple 1: Développeur Full Stack à Paris
    this.createAlert('Développeurs Paris', {
      experience: ['3-5 ans'],
      availability: ['Disponible maintenant'],
      location: ['Paris'],
      skills: ['JavaScript', 'React', 'Node.js'],
      country: 'France'
    });
    
    // Exemple 2: Data Scientists disponibles dans 30 jours
    this.createAlert('Data Scientists', {
      experience: ['5-10 ans'],
      availability: ['Disponible dans 30 jours'],
      location: ['Remote', 'Bordeaux'],
      skills: ['Python', 'Machine Learning', 'TensorFlow'],
      country: 'France'
    });
    
    // Exemple 3: Experts en IA
    this.createAlert('Experts IA', {
      experience: ['10+ ans'],
      availability: ['Disponible maintenant', 'Disponible dans 15 jours'],
      location: ['Lyon', 'Remote'],
      skills: ['Deep Learning', 'NLP', 'Computer Vision'],
      country: 'Belgique'
    });
    
    // Simuler quelques nouveaux consultants pour l'exemple
    setTimeout(() => {
      this.incrementNewConsultantCount(this.getAlerts()[0].id);
      this.incrementNewConsultantCount(this.getAlerts()[0].id);
      this.incrementNewConsultantCount(this.getAlerts()[2].id);
    }, 500);
  }
  
  /**
   * Réinitialise toutes les alertes (pour le débogage)
   */
  resetAllAlerts(): void {
    this.alertState.next(initialAlertState);
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('[AlertService] Toutes les alertes ont été réinitialisées');
  }
}