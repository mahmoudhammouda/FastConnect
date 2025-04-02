import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { UserProfileComponent } from './components/user/profile/user-profile.component';
import { ConsultantListComponent } from './components/consultant-list/consultant-list.component';
import { AuthGuard } from './guards/auth.guard';
import { AppDebugComponent } from './app.component.debug';

const routes: Routes = [
  // Route principale - consultants list
  { path: '', redirectTo: '/consultants', pathMatch: 'full' },
  { path: 'consultants', component: ConsultantListComponent }, // Route principale pour la liste des consultants
  
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
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })], // Suppression du mode hash pour une meilleure compatibilité
  exports: [RouterModule]
})
export class AppRoutingModule { }