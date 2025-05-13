import { Injectable, NgZone } from '@angular/core';
import { Observable, fromEvent, Subject } from 'rxjs';
import { takeUntil, share } from 'rxjs/operators';

/**
 * Service pour gérer les événements de fenêtre de manière réactive avec RxJS
 * Ce service remplace l'utilisation de window.addEventListener
 */
@Injectable({
  providedIn: 'root'
})
export class WindowEventService {
  /**
   * Cache des observables d'événement pour éviter de créer plusieurs souscriptions
   * pour le même type d'événement
   */
  private eventObservables: { [key: string]: Observable<any> } = {};

  constructor(private ngZone: NgZone) {}

  /**
   * Obtient un Observable pour un type d'événement spécifique de la fenêtre
   * @param eventName Nom de l'événement (ex: 'resize', 'message', etc.)
   * @returns Observable de l'événement qui émet chaque fois que l'événement se produit
   */
  fromEvent<T extends Event>(eventName: string): Observable<T> {
    if (!this.eventObservables[eventName]) {
      // Utilise ngZone.runOutsideAngular pour éviter les détections de changement inutiles
      this.eventObservables[eventName] = this.ngZone.runOutsideAngular(() => 
        fromEvent<T>(window, eventName).pipe(
          share() // Partage l'observable entre plusieurs abonnés
        )
      );
    }
    return this.eventObservables[eventName];
  }

  /**
   * Crée un Observable pour les événements personnalisés
   * @param eventName Nom de l'événement personnalisé
   * @returns Observable de l'événement personnalisé
   */
  fromCustomEvent<T extends CustomEvent>(eventName: string): Observable<T> {
    return this.fromEvent<T>(eventName);
  }

  /**
   * Obtient un Observable pour les événements de redimensionnement de fenêtre
   * @returns Observable qui émet à chaque redimensionnement de fenêtre
   */
  resize(): Observable<UIEvent> {
    return this.fromEvent<UIEvent>('resize');
  }

  /**
   * Obtient un Observable pour les événements de message (communication entre fenêtres)
   * @returns Observable qui émet à chaque réception de message
   */
  message(): Observable<MessageEvent> {
    return this.fromEvent<MessageEvent>('message');
  }

  /**
   * Obtient un Observable pour l'événement DOMContentLoaded
   * @returns Observable qui émet lorsque le DOM est chargé
   */
  domContentLoaded(): Observable<Event> {
    return this.fromEvent<Event>('DOMContentLoaded');
  }

  /**
   * Obtient un Observable pour l'événement load
   * @returns Observable qui émet lorsque la page est complètement chargée
   */
  load(): Observable<Event> {
    return this.fromEvent<Event>('load');
  }

  /**
   * Obtient un Observable pour écouter les changements de localStorage
   * @returns Observable qui émet lorsque le localStorage change
   */
  storage(): Observable<StorageEvent> {
    return this.fromEvent<StorageEvent>('storage');
  }
}
