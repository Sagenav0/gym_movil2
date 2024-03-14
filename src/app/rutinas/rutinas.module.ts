import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutinasPageRoutingModule } from './rutinas-routing.module';

import { RutinasPage } from './rutinas.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutinasPageRoutingModule
  ],
  declarations: [RutinasPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RutinasPageModule {}
