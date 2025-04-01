import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router, 
  UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated) {
      // Rediriger vers la page de connexion
      return this.router.createUrlTree(['/login'], { 
        queryParams: { returnUrl: state.url } 
      });
    }
    
    // Vérifier les rôles requis si spécifiés dans les données de route
    const requiredRoles = route.data['roles'] as UserRole[];
    
    if (requiredRoles && requiredRoles.length > 0) {
      const userRole = this.authService.currentUser?.role;
      
      // Vérifier si l'utilisateur a l'un des rôles requis
      if (!userRole || !requiredRoles.includes(userRole)) {
        // Rediriger vers une page d'accès refusé ou la page d'accueil
        return this.router.createUrlTree(['/']);
      }
    }
    
    return true;
  }
}