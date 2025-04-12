import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiService } from './api.service';
import { ConsultantAvailability } from '../models/consultant-availability.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultantAvailabilityService {
  // Endpoint pour les disponibilités
  private endpoint = 'consultant-availabilities';
  
  // Sujets pour la gestion du formulaire et les notifications
  private refreshNeededSource = new Subject<void>();
  private formDataSubject = new BehaviorSubject<any>(null);
  private isEditModeSubject = new BehaviorSubject<boolean>(false);
  
  // Observables publics
  refreshNeeded$ = this.refreshNeededSource.asObservable();
  
  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }
  
  /**
   * Récupère toutes les disponibilités
   */
  getAllAvailabilities(): Observable<ConsultantAvailability[]> {
    return this.apiService.get<ConsultantAvailability[]>(this.endpoint).pipe(
      map(availabilities => availabilities || []),
      catchError(error => {
        console.error('Erreur lors de la récupération des disponibilités', error);
        // En cas d'erreur API, retourner un tableau vide
        return of([]);
      })
    );
  }
  
  /**
   * Récupère une disponibilité par son ID
   * @param id Identifiant de la disponibilité
   */
  getAvailabilityById(id: string): Observable<ConsultantAvailability | null> {
    return this.apiService.get<ConsultantAvailability>(`${this.endpoint}/${id}`).pipe(
      catchError(error => {
        console.error(`Erreur lors de la récupération de la disponibilité ${id}`, error);
        return of(null);
      })
    );
  }
  
  /**
   * Crée une nouvelle disponibilité
   * @param availability Nouvelle disponibilité à créer
   */
  createAvailability(availability: ConsultantAvailability): Observable<ConsultantAvailability> {
    return this.apiService.post<ConsultantAvailability>(this.endpoint, availability);
  }
  
  /**
   * Met à jour une disponibilité existante
   * @param id Identifiant de la disponibilité
   * @param availability Données mises à jour de la disponibilité
   */
  updateAvailability(id: string, availability: ConsultantAvailability): Observable<ConsultantAvailability> {
    return this.apiService.put<ConsultantAvailability>(`${this.endpoint}/${id}`, availability);
  }
  
  /**
   * Supprime une disponibilité
   * @param id Identifiant de la disponibilité à supprimer
   */
  deleteAvailability(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`);
  }
  
  /**
   * Récupère les disponibilités d'un consultant spécifique
   * @param consultantId Identifiant du consultant
   */
  getConsultantAvailabilities(consultantId: string): Observable<ConsultantAvailability[]> {
    return this.apiService.get<ConsultantAvailability[]>(`${this.endpoint}/consultant/${consultantId}`).pipe(
      map(availabilities => availabilities || []),
      catchError(error => {
        console.error(`Erreur lors de la récupération des disponibilités du consultant ${consultantId}`, error);
        return of([]);
      })
    );
  }
  
  /**
   * Notifie que les données doivent être rafraîchies
   */
  notifyRefreshNeeded(): void {
    this.refreshNeededSource.next();
  }
  
  /**
   * Initialise un nouveau formulaire avec des valeurs par défaut
   */
  initNewForm(): void {
    this.isEditModeSubject.next(false);
    this.formDataSubject.next({
      consultantId: '',
      consultantName: '',
      consultantRole: '',
      startDate: new Date().toISOString().split('T')[0],
      durationInMonths: 3,
      status: 'available',
      cities: [],
      workMode: 'onsite',
      rate: null,
      skills: [],
      sectors: []
    });
  }
  
  /**
   * Initialise un formulaire en mode édition avec les données existantes
   * @param availability Disponibilité à éditer
   */
  initEditForm(availability: ConsultantAvailability): void {
    this.isEditModeSubject.next(true);
    this.formDataSubject.next(availability);
  }
  
  /**
   * Obtient l'état du mode édition
   */
  getIsEditMode(): Observable<boolean> {
    return this.isEditModeSubject.asObservable();
  }
  
  /**
   * Obtient les données actuelles du formulaire
   */
  getCurrentFormData(): Observable<any> {
    return this.formDataSubject.asObservable();
  }
  
  /**
   * Enregistre un consultant (création ou mise à jour)
   * @param formData Données du formulaire
   */
  saveConsultant(formData: any): Observable<ConsultantAvailability> {
    if (formData.id) {
      // Mise à jour
      return this.updateAvailability(formData.id, formData as ConsultantAvailability);
    } else {
      // Création
      return this.createAvailability(formData as ConsultantAvailability);
    }
  }
}