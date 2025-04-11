import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Consultant, AvailabilityStatus, ExperienceLevel, Experience } from '../models/consultant.model';
import { ConsultantFormData } from '../models/consultant-form.model';
import { UserService } from './user.service';

/**
 * Valeurs par défaut pour le formulaire
 */
export const DEFAULT_FORM_VALUES: ConsultantFormData = {
  role: '',
  skills: [],
  location: '',
  experience: ExperienceLevel.Intermediate,
  availability: AvailabilityStatus.Available,
  message: '',
  linkedinUrl: '',
  phone: '',
  email: '',
  expertises: [],
  sectors: [],
  experiences: []
};

/**
 * Service de gestion des disponibilités des consultants
 */
@Injectable({
  providedIn: 'root'
})
export class ConsultantAvailabilityService {
  // État d'édition du formulaire
  private isEditMode = new BehaviorSubject<boolean>(false);
  
  // Données courantes du formulaire
  private currentFormData = new BehaviorSubject<ConsultantFormData | null>(null);
  
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}
  
  /**
   * Initialise un nouveau formulaire avec les valeurs par défaut
   */
  initNewForm(): void {
    this.isEditMode.next(false);
    this.currentFormData.next({...DEFAULT_FORM_VALUES});
  }
  
  /**
   * Initialise le formulaire avec les données d'un consultant existant
   */
  initEditForm(consultant: Consultant): void {
    this.isEditMode.next(true);
    
    const formData: ConsultantFormData = {
      id: consultant.id,
      role: consultant.role,
      skills: [...consultant.skills],
      location: consultant.location,
      experience: consultant.experience,
      availability: consultant.availability,
      message: consultant.message || '',
      linkedinUrl: consultant.linkedinUrl,
      phone: consultant.phone || '',
      email: consultant.email || '',
      expertises: consultant.expertises ? [...consultant.expertises] : [],
      sectors: consultant.sectors ? [...consultant.sectors] : [],
      experiences: consultant.experiences ? [...consultant.experiences] : []
    };
    
    this.currentFormData.next(formData);
  }
  
  /**
   * Obtient l'état d'édition du formulaire
   */
  getIsEditMode(): Observable<boolean> {
    return this.isEditMode.asObservable();
  }
  
  /**
   * Obtient les données courantes du formulaire
   */
  getCurrentFormData(): Observable<ConsultantFormData | null> {
    return this.currentFormData.asObservable();
  }
  
  /**
   * Crée ou met à jour un consultant
   */
  saveConsultant(data: ConsultantFormData): Observable<Consultant> {
    // Pour le mode démo, on simule la sauvegarde avec un délai
    // Dans une application réelle, ceci ferait appel à l'API
    return new Observable<Consultant>(observer => {
      setTimeout(() => {
        // On récupère l'ID de l'utilisateur courant
        const userId = this.userService.getCurrentUserId();
        
        // Si l'ID est null, on simule une erreur d'authentification
        if (!userId) {
          observer.error(new Error('Utilisateur non authentifié.'));
          return;
        }
        
        // On prépare les données à sauvegarder
        const dataToSave: any = {
          ...data,
          createdBy: userId,
        };
        
        // Si c'est une création (pas d'ID)
        if (!data.id) {
          // Génération d'un ID unique
          dataToSave.id = 'consultant-' + Math.floor(Math.random() * 10000);
          dataToSave.createdAt = new Date();
        }
        
        // Dans une application réelle, on enverrait ces données à l'API
        // Par exemple :
        // if (data.id) {
        //   return this.http.put<Consultant>(`/api/consultants/${data.id}`, dataToSave);
        // } else {
        //   return this.http.post<Consultant>('/api/consultants', dataToSave);
        // }
        
        // Pour la démo, on simule un succès
        observer.next(dataToSave as Consultant);
        observer.complete();
      }, 1000); // Délai simulé
    });
  }
}