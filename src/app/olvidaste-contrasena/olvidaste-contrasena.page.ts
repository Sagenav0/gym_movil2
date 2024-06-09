import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ConexionService } from 'src/app/services/conexion.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-olvidaste-contrasena',
  templateUrl: './olvidaste-contrasena.page.html',
  styleUrls: ['./olvidaste-contrasena.page.scss'],
})
export class OlvidasteContrasenaPage implements OnInit {

  correo = ""
  emailPattern = /^[A-Za-z_\-][A-Za-z_\-0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


  constructor(private conexion: ConexionService,
              private toastController: ToastController,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }
  

    
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  Recuperar_contrasena(){

    if (this.emailPattern.test(this.correo)){
      this.conexion.consultaCorreo(this.correo).subscribe(
        response => {
          if (response.message === 'Correo encontrado') {

            this.conexion.EnviarCorreo(this.correo).subscribe(
              response => {
                if (response.message === 'Correo enviado correctamente') {
                  
                  this.router.navigate(['/verificar-codigo']);
                  this.userService.setUser(this.correo);
                  this.presentToast('Envio el correo');
                  
                } else {
                  this.presentToast('El correo no existe, por favor coloque uno valido');
                }
              },
              error => {
                this.presentToast('Error al enviar el correo');
              }
            );
            
          } else {
            this.presentToast('El correo no existe, por favor coloque uno valido');
          }
        },
        error => {
          this.presentToast('Error al consultar el correo');
        }
      );

    }else{
      this.presentToast('Ingrese un correo válido');
    }


  }

}
