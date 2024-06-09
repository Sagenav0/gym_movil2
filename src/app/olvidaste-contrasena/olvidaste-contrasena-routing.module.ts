import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlvidasteContrasenaPage } from './olvidaste-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: OlvidasteContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlvidasteContrasenaPageRoutingModule {}
