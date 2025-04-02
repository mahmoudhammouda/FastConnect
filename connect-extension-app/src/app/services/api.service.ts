import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Service de base pour les appels API
 * Gère les différentes configurations selon le contexte (application web ou extension Chrome)
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = environment.apiUrl;
  private readonly IS_EXTENSION = environment.isExtension;
  private readonly IS_REPLIT = window.location.hostname.includes('.replit.dev') || 
                               window.location.hostname.includes('.replit.app');

  constructor(private http: HttpClient) {
    // Si nous sommes sur Replit, utilisez l'URL Replit
    if (this.IS_REPLIT && environment.apiUrlReplit) {
      this.API_URL = environment.apiUrlReplit;
    }
    
    console.log('API Service initialisé avec URL:', this.API_URL);
    console.log('Contexte: ', this.IS_EXTENSION ? 'Extension Chrome' : 'Application Web');
    console.log('Environnement: ', this.IS_REPLIT ? 'Replit' : 'Local');
  }

  /**
   * Crée une URL complète pour une route API
   * @param endpoint Point de terminaison API (sans le préfixe /api)
   * @returns URL complète
   */
  buildApiUrl(endpoint: string): string {
    // Si l'endpoint est déjà une URL complète, la retourner telle quelle
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }
    
    // S'assurer que endpoint commence par "/" si ce n'est pas déjà le cas
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    
    // Pour l'extension Chrome, assurons-nous d'utiliser une URL absolue
    if (this.IS_EXTENSION) {
      console.log(`Extension context: building absolute URL: ${this.API_URL}${endpoint}`);
    }
    
    return `${this.API_URL}${endpoint}`;
  }

  /**
   * Effectue une requête GET
   * @param endpoint Point de terminaison
   * @param options Options HTTP
   * @returns Observable de la réponse
   */
  get<T>(endpoint: string, options = {}): Observable<T> {
    return this.http.get<T>(this.buildApiUrl(endpoint), options);
  }

  /**
   * Effectue une requête POST
   * @param endpoint Point de terminaison
   * @param body Corps de la requête
   * @param options Options HTTP
   * @returns Observable de la réponse
   */
  post<T>(endpoint: string, body: any, options = {}): Observable<T> {
    return this.http.post<T>(this.buildApiUrl(endpoint), body, options);
  }

  /**
   * Effectue une requête PUT
   * @param endpoint Point de terminaison
   * @param body Corps de la requête
   * @param options Options HTTP
   * @returns Observable de la réponse
   */
  put<T>(endpoint: string, body: any, options = {}): Observable<T> {
    return this.http.put<T>(this.buildApiUrl(endpoint), body, options);
  }

  /**
   * Effectue une requête DELETE
   * @param endpoint Point de terminaison
   * @param options Options HTTP
   * @returns Observable de la réponse
   */
  delete<T>(endpoint: string, options = {}): Observable<T> {
    return this.http.delete<T>(this.buildApiUrl(endpoint), options);
  }
}