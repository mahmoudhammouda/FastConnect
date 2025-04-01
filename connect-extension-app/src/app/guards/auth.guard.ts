import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
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
    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated) {
      // Rediriger vers la page de connexion
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    // Si l'utilisateur doit compléter l'onboarding, rediriger vers cette page (sauf si déjà sur cette page)
    if (this.authService.needsOnboarding() && !state.url.includes('/onboarding')) {
      this.router.navigate(['/onboarding']);
      return false;
    }

    return true;
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
    // Si l'utilisateur est authentifié, rediriger vers la page d'accueil
    if (this.authService.isAuthenticated) {
      // Si l'utilisateur doit compléter l'onboarding, rediriger vers cette page
      if (this.authService.needsOnboarding()) {
        this.router.navigate(['/onboarding']);
      } else {
        this.router.navigate(['/']);
      }
      return false;
    }

    return true;
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

    // Si l'utilisateur a déjà complété l'onboarding, rediriger vers la page d'accueil
    if (!this.authService.needsOnboarding()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
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
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    // Récupérer les rôles autorisés depuis les données de la route
    const allowedRoles = route.data['roles'] as UserRole[];
    if (!allowedRoles || allowedRoles.length === 0) {
      return true; // Si aucun rôle n'est spécifié, l'accès est autorisé
    }

    // Vérifier si l'utilisateur a l'un des rôles requis
    const userRole = this.authService.getUserRole();
    if (!userRole || !allowedRoles.includes(userRole)) {
      this.router.navigate(['/forbidden']);
      return false;
    }

    return true;
  }
}