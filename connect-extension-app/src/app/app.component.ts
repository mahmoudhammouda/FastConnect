import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { ModalService } from './services/modal.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'FastConnect';
  currentUser: User | null = null;
  isAuthenticated = false;
  currentRoute = '';
  menuOpen = false;
  isDebugEnabled = true; // Par défaut, le débogage est activé
  showFloatingDebug = false; // Le débogueur flottant est désactivé par défaut
  debugElement: HTMLElement | null = null;
  debugInfo = {
    baseHref: document.getElementsByTagName('base')[0]?.getAttribute('href') || 'undefined',
    location: window.location.href,
    environment: environment.envName || 'undefined',
    apiUrl: environment.apiUrl || 'undefined',
    routerUrl: '',
    isExtension: environment.isExtension,
    appStartTime: new Date().toISOString()
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    public modalService: ModalService
  ) {
    console.log('🔍 FastConnect initialisation:', this.debugInfo);
    
    // Vérifier si le débogage est désactivé dans le localStorage
    const savedDebugState = localStorage.getItem('fastconnect-debug-enabled');
    if (savedDebugState !== null) {
      this.isDebugEnabled = savedDebugState === 'true';
    }
    
    const savedFloatingDebugState = localStorage.getItem('fastconnect-floating-debug');
    if (savedFloatingDebugState !== null) {
      this.showFloatingDebug = savedFloatingDebugState === 'true';
    }
    
    // Créer un élément pour le débogage visuel flottant
    setTimeout(() => {
      this.createFloatingDebugElement();
      this.updateFloatingDebugVisibility();
    }, 1000);
  }

  ngOnInit(): void {
    // Observer les changements d'état d'authentification
    this.authService.authState$.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.currentUser = state.user;
    });

    // Observer les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
      this.menuOpen = false; // Fermer le menu à chaque changement de route
    });
  }
  
  /**
   * Crée l'élément de débogage flottant
   */
  createFloatingDebugElement(): void {
    // Supprimer l'ancien élément s'il existe
    const existingDebugElement = document.getElementById('floating-debug-info');
    if (existingDebugElement) {
      document.body.removeChild(existingDebugElement);
    }
    
    // Créer un nouvel élément
    this.debugElement = document.createElement('div');
    this.debugElement.id = 'floating-debug-info';
    this.debugElement.style.position = 'fixed';
    this.debugElement.style.bottom = '10px';
    this.debugElement.style.left = '10px';
    this.debugElement.style.padding = '10px';
    this.debugElement.style.background = 'rgba(0,0,0,0.7)';
    this.debugElement.style.color = 'white';
    this.debugElement.style.fontSize = '12px';
    this.debugElement.style.fontFamily = 'monospace';
    this.debugElement.style.zIndex = '9999';
    this.debugElement.style.borderRadius = '5px';
    this.debugElement.style.transition = 'transform 0.3s ease';
    this.debugElement.style.display = this.showFloatingDebug ? 'block' : 'none';
    this.debugElement.innerHTML = `
      <strong>DEBUGGER</strong><br>
      Base: ${this.debugInfo.baseHref}<br>
      URL: ${this.debugInfo.location}<br>
      Env: ${this.debugInfo.environment}<br>
      API: ${this.debugInfo.apiUrl}<br>
      Ext: ${this.debugInfo.isExtension}<br>
      Time: ${this.debugInfo.appStartTime}<br>
    `;
    document.body.appendChild(this.debugElement);
  }
  
  /**
   * Met à jour la visibilité de l'élément de débogage flottant
   */
  updateFloatingDebugVisibility(): void {
    if (!this.debugElement) return;
    
    this.debugElement.style.display = this.showFloatingDebug ? 'block' : 'none';
  }
  
  /**
   * Active ou désactive le mode débogage
   */
  toggleDebugMode(): void {
    this.isDebugEnabled = !this.isDebugEnabled;
    localStorage.setItem('fastconnect-debug-enabled', this.isDebugEnabled.toString());
    
    // Mettre à jour les éléments visuels de débogage
    const headerDebug = document.getElementById('header-debug-bar');
    if (headerDebug) {
      headerDebug.style.display = this.isDebugEnabled ? 'block' : 'none';
    }
  }
  
  /**
   * Active ou désactive le débogueur flottant
   */
  toggleFloatingDebug(): void {
    this.showFloatingDebug = !this.showFloatingDebug;
    localStorage.setItem('fastconnect-floating-debug', this.showFloatingDebug.toString());
    this.updateFloatingDebugVisibility();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  openLoginModal(): void {
    this.modalService.openLoginModal();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Au lieu de rediriger, on reste sur la même page
        this.menuOpen = false;
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
        this.menuOpen = false;
      }
    });
  }
  
  /**
   * Retourne l'initiale du prénom ou du nom d'utilisateur pour l'affichage mobile
   * @returns Une lettre initiale ou 'U' par défaut
   */
  getInitials(): string {
    if (this.currentUser) {
      if (this.currentUser.firstName) {
        return this.currentUser.firstName.charAt(0);
      }
      if (this.currentUser.username) {
        return this.currentUser.username.charAt(0);
      }
    }
    return 'U';
  }
}