import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';
import { UserService } from '../user.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  Datoseditar: any[] = [];
  usuario = this.userService.getUser();
  cedula = this.userService.getCedula();
  telefono = "";
  telefononuevo = "";
  imagenuser: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;

  constructor(
    private conexionService: ConexionService,
    private userService: UserService,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private router: Router,
    private cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.consultaEdit();
    this.imageUrl = this.userService.getImageUrl();
  }


  consultaEdit() {
    this.conexionService.Datosedit(this.usuario).subscribe(
      (datos: any[]) => {
        this.Datoseditar = datos;
        this.telefono = datos[0].telefono;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
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

  update_telefono() {
    if (this.telefono === this.telefononuevo) {
      this.presentToast('No se puede usar el teléfono actual. Por favor ingrese uno nuevo');
    } else {
      const dat = {
        telefono: this.telefononuevo,
        cedula: this.cedula
      };
      this.conexionService.cambiarTelefono(dat).subscribe(
        data => {
          this.presentToast('El teléfono se cambió con éxito');
          this.closeModal();
          this.router.navigate(['/editar-perfil']);
        },
        error => {
          this.presentToast('Error al cambiar el teléfono');
          this.closeModal();
        }
      );
    }
  }

  imagen_usuario_selecion() {
    const fileInput = document.getElementById('imagen_de_perfil') as HTMLInputElement;
    fileInput.click();
  }

  imagen_del_usuario_perfil(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imagenuser = file;
      this.userService.setImagenUser(file);
      this.imageUrl = this.userService.getImageUrl(); // Actualizar imageUrl
  
      const formData = new FormData();
      formData.append('imagenuser', file);
      formData.append('cedula', this.cedula);
  
      this.conexionService.guardarimagenusuario(formData).subscribe(
        data => {
          this.presentToast('La imagen se cambió con éxito');
          this.closeModal();
        },
        error => {
          this.presentToast('Error al cambiar la imagen');
          this.closeModal();
        }
      );
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }  
}
