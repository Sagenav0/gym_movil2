import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarContraOlvidadaPageRoutingModule } from './cambiar-contra-olvidada-routing.module';

import { CambiarContraOlvidadaPage } from './cambiar-contra-olvidada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarContraOlvidadaPageRoutingModule
  ],
  declarations: [CambiarContraOlvidadaPage]
})
export class CambiarContraOlvidadaPageModule {}
