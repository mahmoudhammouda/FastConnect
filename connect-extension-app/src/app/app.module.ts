import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  SocialLoginModule, 
  SocialAuthServiceConfig,
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultantCardComponent } from './components/consultant-card/consultant-card.component';
import { ConsultantListComponent } from './components/consultant-list/consultant-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserProfileComponent } from './components/user/profile/user-profile.component';
import { AuthInterceptor } from './services/auth.interceptor';

// Note: Il faut obtenir un Client ID Google valide depuis Google Developer Console
const googleClientId = 'GOOGLE_CLIENT_ID'; // Remplacer par un ID réel

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule, // Module d'authentification sociale
    AppRoutingModule,
    // Composants standalone
    ConsultantCardComponent,
    ConsultantListComponent,
    LoginComponent,
    UserProfileComponent
  ],
  providers: [
    // Configuration pour Google OAuth (temporaire en attendant LinkedIn)
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(googleClientId, {
              scopes: 'email profile'
            })
          }
        ],
        onError: (err) => {
          console.error('Erreur lors de l\'authentification sociale:', err);
        }
      } as SocialAuthServiceConfig
    },
    // Intercepteur HTTP pour ajouter le token à toutes les requêtes
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
