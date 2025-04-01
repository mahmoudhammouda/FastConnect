import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router,
  CanActivate
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

/**
 * Garde qui vérifie si l'utilisateur est authentifié
 * Utilisé pour protéger les routes qui nécessitent une authentification
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Vérifie si l'utilisateur peut accéder à la route
   * @param route Information sur la route activée
   * @param state État du routeur
   * @returns Booléen indiquant si l'accès est autorisé
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated) {
      // Vérifier si l'utilisateur a besoin de compléter l'onboarding
      if (this.authService.needsOnboarding() && !state.url.includes('/onboarding')) {
        this.router.navigate(['/onboarding']);
        return false;
      }
      return true;
    }

    // Rediriger vers la page de connexion
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

/**
 * Garde qui vérifie si l'utilisateur n'est PAS authentifié
 * Utilisé pour protéger les routes qui ne sont accessibles qu'aux invités (login, register)
 */
@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Vérifie si l'utilisateur peut accéder à la route en tant qu'invité
   * @param route Information sur la route activée
   * @param state État du routeur
   * @returns Booléen indiquant si l'accès est autorisé
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isAuthenticated) {
      return true;
    }

    // Si l'utilisateur est déjà authentifié, le rediriger vers la page d'accueil
    this.router.navigate(['/']);
    return false;
  }
}

/**
 * Garde qui vérifie si l'utilisateur doit compléter l'onboarding
 * Utilisé pour protéger la route d'onboarding
 */
@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Vérifie si l'utilisateur doit accéder à la page d'onboarding
   * @param route Information sur la route activée
   * @param state État du routeur
   * @returns Booléen indiquant si l'accès est autorisé
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    // Vérifier si l'utilisateur a besoin de compléter l'onboarding
    if (this.authService.needsOnboarding()) {
      return true;
    }

    // Si l'onboarding est déjà complété, rediriger vers la page d'accueil
    this.router.navigate(['/']);
    return false;
  }
}

/**
 * Garde qui vérifie le rôle de l'utilisateur
 * Utilisé pour protéger les routes qui nécessitent un rôle spécifique
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Vérifie si l'utilisateur a le rôle requis pour accéder à la route
   * @param route Information sur la route activée, contenant les rôles requis
   * @param state État du routeur
   * @returns Booléen indiquant si l'accès est autorisé
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // Vérifier si l'onboarding est complété
    if (this.authService.needsOnboarding()) {
      this.router.navigate(['/onboarding']);
      return false;
    }

    const rolesRequired = route.data['roles'] as UserRole[];
    
    // Si aucun rôle n'est spécifié, autoriser l'accès
    if (!rolesRequired || rolesRequired.length === 0) {
      return true;
    }

    // Vérifier si l'utilisateur a l'un des rôles requis
    const userRole = this.authService.getUserRole();
    if (userRole && rolesRequired.includes(userRole)) {
      return true;
    }

    // Rediriger vers la page d'accueil si l'utilisateur n'a pas le rôle requis
    this.router.navigate(['/']);
    return false;
  }
}