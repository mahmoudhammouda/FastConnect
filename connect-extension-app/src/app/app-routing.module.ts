import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { UserProfileComponent } from './components/user/profile/user-profile.component';
import { ConsultantListComponent } from './components/consultant-list/consultant-list.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { BookmarkListsComponent } from './components/bookmark-lists/bookmark-lists.component';
import { AlertListComponent } from './components/alert-list/alert-list.component';
import { AvailabilityListComponent } from './components/availability-list/availability-list.component';
import { AuthGuard } from './guards/auth.guard';
import { AppDebugComponent } from './app.component.debug';
import { LinkedInCallbackComponent } from './components/auth/linkedin-callback/linkedin-callback.component';

const routes: Routes = [
  // Route principale - consultants list
  { path: '', component: ConsultantListComponent }, // Route principale directe vers la liste des consultants
  { path: 'consultants', component: ConsultantListComponent }, // Route alternative
  
  // Gestion des contacts recruteurs
  { path: 'contacts', component: ContactListComponent },
  
  // Gestion des favoris
  { path: 'bookmarks', component: BookmarkListsComponent },
  
  // Gestion des alertes automatiques
  { path: 'alerts', component: AlertListComponent },
  
  // Gestion des disponibilités
  { path: 'availabilities', component: AvailabilityListComponent },
  
  // Routes d'authentification
  { path: 'login', component: LoginComponent },
  { path: 'auth/linkedin/callback', component: LinkedInCallbackComponent }, // Route pour le callback LinkedIn
  
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
    useHash: false,  // Désactivation du mode hash pour permettre les callbacks OAuth
    enableTracing: false // Désactiver le traçage pour la production
  })], 
  exports: [RouterModule]
})
export class AppRoutingModule { }