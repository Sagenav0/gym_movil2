import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-contra',
  templateUrl: './cambiar-contra.page.html',
  styleUrls: ['./cambiar-contra.page.scss'],
})
export class CambiarContraPage implements OnInit {


  contra1:string =''
  contra2:string=''
  cedula:string='0202020202'

  constructor(private conexion: ConexionService,
              private toastController: ToastController,
              private modalCtrl: ModalController,
              private router: Router) { }

  ngOnInit() {
  }

  verificarContrasena() {
    if (this.contra1 == this.contra2){

      const dat = {
        contra1: this.contra1,
        cedula: this.cedula
      };

      this.conexion.cambiarContra(dat).subscribe(
        data => {
          this.presentToast('La contraseña se cambio con exito');
          this.closeModal();
          this.router.navigate(['/editar-usuario']);

        },
        error => {
          this.presentToast('Error al cambiar la contraseña');
          this.closeModal();
        }
      );
    } else {
      this.presentToast('Las contraseñas no coinciden');
      this.closeModal();
    }}



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

}
