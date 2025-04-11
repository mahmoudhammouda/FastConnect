import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultantAvailabilityService {
  private refreshNeededSource = new BehaviorSubject<boolean>(false);
  refreshNeeded$ = this.refreshNeededSource.asObservable();
  
  // État du mode d'édition (nouveau vs édition)
  private isEditModeSource = new BehaviorSubject<boolean>(false);
  private currentFormDataSource = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  /**
   * Notifie les abonnés qu'une actualisation des données est nécessaire
   */
  notifyRefreshNeeded(): void {
    this.refreshNeededSource.next(true);
  }
  
  /**
   * Initialise un nouveau formulaire
   */
  initNewForm(): void {
    this.isEditModeSource.next(false);
    this.currentFormDataSource.next({
      firstName: '',
      lastName: '',
      role: '',
      abbreviation: '',
      country: '',
      cities: [],
      experienceLevel: '',
      linkedinUrl: '',
      isProfileLocked: false,
      isSubcontractor: false,
      skills: []
    });
  }
  
  /**
   * Initialise le formulaire en mode édition
   * @param consultantData Les données du consultant à éditer
   */
  initEditForm(consultantData: any): void {
    this.isEditModeSource.next(true);
    this.currentFormDataSource.next(consultantData);
  }
  
  /**
   * Récupère l'état du mode d'édition
   */
  getIsEditMode(): Observable<boolean> {
    return this.isEditModeSource.asObservable();
  }
  
  /**
   * Récupère les données actuelles du formulaire
   */
  getCurrentFormData(): Observable<any> {
    return this.currentFormDataSource.asObservable();
  }
  
  /**
   * Enregistre un consultant (ajout ou mise à jour)
   * @param formData Les données du formulaire à enregistrer
   */
  saveConsultant(formData: any): Observable<any> {
    if (this.isEditModeSource.value && formData.id) {
      // Mode édition
      return this.updateConsultantAvailability(formData.id, formData);
    } else {
      // Mode ajout
      return this.addConsultantAvailability(formData);
    }
  }

  /**
   * Ajoute une nouvelle disponibilité de consultant
   * @param consultantData Les données du consultant à ajouter
   * @returns Une Observable contenant la réponse du serveur
   */
  addConsultantAvailability(consultantData: any): Observable<any> {
    return this.apiService.post('/consultants/availability', consultantData);
  }

  /**
   * Met à jour la disponibilité d'un consultant
   * @param consultantId L'identifiant du consultant
   * @param availabilityData Les données de disponibilité à mettre à jour
   * @returns Une Observable contenant la réponse du serveur
   */
  updateConsultantAvailability(consultantId: string, availabilityData: any): Observable<any> {
    return this.apiService.put(`/consultants/${consultantId}/availability`, availabilityData);
  }

  /**
   * Supprime la disponibilité d'un consultant
   * @param consultantId L'identifiant du consultant
   * @returns Une Observable contenant la réponse du serveur
   */
  deleteConsultantAvailability(consultantId: string): Observable<any> {
    return this.apiService.delete(`/consultants/${consultantId}/availability`);
  }
}