import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { UserProfileComponent } from './components/user/profile/user-profile.component';
import { ConsultantListComponent } from './components/consultant-list/consultant-list.component';
import { BookmarkListsComponent } from './components/bookmark-lists/bookmark-lists.component';
import { AlertListComponent } from './components/alert-list/alert-list.component';
import { AuthGuard } from './guards/auth.guard';
import { AppDebugComponent } from './app.component.debug';

const routes: Routes = [
  // Route principale - consultants list
  { path: '', component: ConsultantListComponent }, // Route principale directe vers la liste des consultants
  { path: 'consultants', component: ConsultantListComponent }, // Route alternative
  
  // Gestion des favoris
  { path: 'bookmarks', component: BookmarkListsComponent },
  
  // Gestion des alertes automatiques
  { path: 'alerts', component: AlertListComponent },
  
  // Routes d'authentification
  { path: 'login', component: LoginComponent },

  // Route de débogage
  { path: 'debug', component: AppDebugComponent },
  
  // Routes protégées par AuthGuard
  { 
    path: 'profile', 
    component: UserProfileComponent, 
    canActivate: [AuthGuard] 
  },
  
  // Routes spécifiques aux rôles
  {
    path: 'admin',
    component: UserProfileComponent, // Temporaire - à remplacer par AdminDashboardComponent
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'consultant-profile',
    component: UserProfileComponent, // Temporaire - à remplacer par ConsultantProfileComponent
    canActivate: [AuthGuard],
    data: { roles: ['consultant'] }
  },
  
  // Redirection par défaut
  { path: '**', component: ConsultantListComponent } // Redirection vers la liste des consultants
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    useHash: true,  // Utilisation du mode hash pour une meilleure compatibilité avec Replit
    enableTracing: false // Désactiver le traçage pour la production
  })], 
  exports: [RouterModule]
})
export class AppRoutingModule { }