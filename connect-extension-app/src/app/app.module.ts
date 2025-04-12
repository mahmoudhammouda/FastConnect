import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultantCardComponent } from './components/consultant-card/consultant-card.component';
import { ConsultantListComponent } from './components/consultant-list/consultant-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserProfileComponent } from './components/user/profile/user-profile.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { RouterModule } from '@angular/router';
import { AppDebugComponent } from './app.component.debug';
import { AlertListComponent } from './components/alert-list/alert-list.component';
import { ConsultantFormComponent } from './components/consultant-form/consultant-form.component';
import { BookmarkListsComponent } from './components/bookmark-lists/bookmark-lists.component';
import { AddAvailabilityModalComponent } from './components/add-availability-modal/add-availability-modal.component';
import { AvailabilityListComponent } from './components/availability-list/availability-list.component';

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
    AddAvailabilityModalComponent, // Ajouté ici car maintenant c'est un composant standalone
    AvailabilityListComponent // Composant de liste des disponibilités
  ],
  providers: [
    // Intercepteur HTTP pour ajouter le token à toutes les requêtes
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
