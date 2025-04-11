import { Provider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService, USER_SERVICE_TOKEN } from './services/user.service';

/**
 * Fournisseurs pour l'application
 */
export const appProviders: Provider[] = [
  { provide: USER_SERVICE_TOKEN, useClass: UserService }
];

/**
 * Imports de modules pour l'application
 */
export const appImports = [
  HttpClientModule
];