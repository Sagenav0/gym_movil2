import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarContraOlvidadaPage } from './cambiar-contra-olvidada.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarContraOlvidadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarContraOlvidadaPageRoutingModule {}
