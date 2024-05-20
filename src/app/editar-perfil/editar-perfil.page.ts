import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';
import { UserService } from '../user.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  Datoseditar: any[] = [];
  usuario = this.userService.getUser()
  cedula = this.userService.getCedula();
  telefono = "";
  telefononuevo= "";
  constructor(
    private conexionService: ConexionService,
    private userService: UserService, private toastController: ToastController,
    private modalCtrl: ModalController, private router: Router
  ) { }

  ngOnInit() {
    this.consultaEdit();
  }
  consultaEdit() {
   
    this.conexionService.Datosedit(this.usuario).subscribe(
      (datos: any[]) => {
        console.log(this.cedula)
        this.Datoseditar = datos
        this.telefono = datos[0].telefono
        
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        // Aquí podemos agregar codigo para manejar el errores o mostrar un mensaje al usuario
      }
    );
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


  update_telefono(){
   
     if(this.telefono === this.telefononuevo){
      this.presentToast('no se puede usar el telefono actual por favor ingrese uno nuevo')

     }else{
        const dat = {
          telefono: this.telefononuevo,
          cedula: this.cedula
        };
        this.conexionService.cambiarTelefono(dat).subscribe(
          data => {
            this.presentToast('El telefono se cambió con éxito');
            this.closeModal();
            this.router.navigate(['/editar-perfil']);
          },
          error => {
            this.presentToast('Error al cambiar el telefono');
            this.closeModal();
          }
        );
      }
     }
    
          
     


}
