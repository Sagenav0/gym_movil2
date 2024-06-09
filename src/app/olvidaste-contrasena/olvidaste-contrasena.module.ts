import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvidasteContrasenaPageRoutingModule } from './olvidaste-contrasena-routing.module';

import { OlvidasteContrasenaPage } from './olvidaste-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvidasteContrasenaPageRoutingModule
  ],
  declarations: [OlvidasteContrasenaPage]
})
export class OlvidasteContrasenaPageModule {}
