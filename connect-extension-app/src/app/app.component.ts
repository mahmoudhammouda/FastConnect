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
    
    // Créer un élément pour le débogage visuel
    setTimeout(() => {
      const debugElement = document.createElement('div');
      debugElement.id = 'debug-info';
      debugElement.style.position = 'fixed';
      debugElement.style.bottom = '10px';
      debugElement.style.left = '10px';
      debugElement.style.padding = '10px';
      debugElement.style.background = 'rgba(0,0,0,0.7)';
      debugElement.style.color = 'white';
      debugElement.style.fontSize = '12px';
      debugElement.style.fontFamily = 'monospace';
      debugElement.style.zIndex = '9999';
      debugElement.style.borderRadius = '5px';
      debugElement.innerHTML = `
        <strong>DEBUGGER</strong><br>
        Base: ${this.debugInfo.baseHref}<br>
        URL: ${this.debugInfo.location}<br>
        Env: ${this.debugInfo.environment}<br>
        API: ${this.debugInfo.apiUrl}<br>
        Ext: ${this.debugInfo.isExtension}<br>
        Time: ${this.debugInfo.appStartTime}<br>
      `;
      document.body.appendChild(debugElement);
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
}