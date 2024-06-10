import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ConexionService } from 'src/app/services/conexion.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-verificar-codigo',
  templateUrl: './verificar-codigo.page.html',
  styleUrls: ['./verificar-codigo.page.scss'],
})
export class VerificarCodigoPage implements OnInit {

  codigo = "";
  usuario = this.userService.getUser()

  constructor(private conexion: ConexionService,
              private toastController: ToastController,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.usuario
  }
  
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  Verificar_codigo(){

    console.log(this.codigo.length)
    if (this.codigo.length == 6){

      this.conexion.verificarCodigo(this.codigo,this.usuario).subscribe(
        response => {
          if (response.message === 'codigo coincide') {
            
            this.router.navigate(['/cambiar-contra-olvidada']);

            this.presentToast('El codigo coincide');
            
          } else {
            this.presentToast('El codigo no coincide, por favor colocarlo bien');
          }
        },
        error => {
          this.presentToast('Error al verificar el codigo');
        }
      );

    }else{
      this.presentToast('El codigo tiene que ser de 6 digitos');
    }

  }

}
