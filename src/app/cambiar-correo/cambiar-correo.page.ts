import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ConexionService } from 'src/app/services/conexion.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cambiar-correo',
  templateUrl: './cambiar-correo.page.html',
  styleUrls: ['./cambiar-correo.page.scss'],
})
export class CambiarCorreoPage implements OnInit {

  correo=""
  correo2=""
  cedula="020202020222"

  constructor(private conexion: ConexionService,
              private toastController: ToastController,
              private modalCtrl: ModalController,
              private router: Router) { }

  ngOnInit() {
  }

  async closeModal() {
    this.modalCtrl.dismiss(null, 'closed');
  }
    
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  verificarCorreo() {
    if (this.correo == this.correo2){

      const dat = {
        correo: this.correo,
        cedula: this.cedula
      };

      this.conexion.cambiarCorreo(dat).subscribe(
        data => {
          this.presentToast('El correo se cambio con exito');
          this.closeModal();
          this.router.navigate(['/editar-perfil']);

        },
        error => {
          this.presentToast('Error al cambiar el correo');
          this.closeModal();
        }
      );
    } else {
      this.presentToast('Los correos no coinciden');
      this.closeModal();
    }}

}
