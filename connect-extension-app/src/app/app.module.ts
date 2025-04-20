import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultantCardComponent } from './components/consultant-card/consultant-card.component';
import { ConsultantListComponent } from './components/consultant-list/consultant-list.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserProfileComponent } from './components/user/profile/user-profile.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { RouterModule } from '@angular/router';
import { AppDebugComponent } from './app.component.debug';
import { AlertListComponent } from './components/alert-list/alert-list.component';
import { ConsultantFormComponent } from './components/consultant-form/consultant-form.component';
import { BookmarkListsComponent } from './components/bookmark-lists/bookmark-lists.component';
// (Référence à AddAvailabilityModalComponent supprimée)
import { AvailabilityListComponent } from './components/availability-list/availability-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FcAppComponent } from './components/fc-app/fc-app.component';

@NgModule({
  declarations: [
    AppComponent
    // Les composants qui ne sont pas standalone doivent être déclarés ici
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule, // Ajout explicite du RouterModule
    // Importation des composants standalone et modules
    CommonModule,
    ConsultantCardComponent,
    ConsultantListComponent,
    LoginComponent,
    UserProfileComponent,
    AppDebugComponent,
    AlertListComponent,
    ConsultantFormComponent,
    BookmarkListsComponent,
    // (Référence à AddAvailabilityModalComponent supprimée)
    AvailabilityListComponent, // Composant de liste des disponibilités
    NavbarComponent, // Composant de navigation
    FcAppComponent // Composant principal de l'application FastConnect
  ],
  providers: [
    // Intercepteur HTTP pour ajouter le token à toutes les requêtes
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
