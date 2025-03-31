import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// On ne définit pas de routes pour la page principale car le contenu
// est affiché directement dans le composant principal
const routes: Routes = [
  // Routes vides - le contenu est géré par app.component.html
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }