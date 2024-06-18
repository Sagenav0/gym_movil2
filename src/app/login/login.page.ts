import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ConexionService } from '../services/conexion.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  contrasena: string = '';
  rememberMe: boolean = false;
  idMembresia: number = 0;

  constructor(private conexion: ConexionService,
              private toastController: ToastController,
              private modalCtrl: ModalController,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.loadSavedCredentials();
  

  }

  async verificarCorreoLogin() {
    if (!this.usuario) {
      console.log('Por favor ingrese un correo.');
      return;
    }

    try {
      const response = await this.conexion.validarCorreoLogin(this.usuario).toPromise();

      if (response.error === "ok") {
        this.idMembresia = response.id_mem;
        
        this.userService.setIdMembresia(this.idMembresia);
        console.log("valor prueba",this.idMembresia)
        this.userService.setmembresia(response.id_mem[0]);
        
      } else {
        
        console.log('El correo no existe en la base de datos.');
        this.presentToastUser();
      }
    } catch (error) {
      console.error('Error al verificar correo:', error);
    }
  }



  async login() {
    if (!this.usuario || !this.contrasena) {
      this.presentToast();
      return;
    }

    try {
      const response = await this.conexion.validarCredenciales(this.usuario, this.contrasena).toPromise();
      if (response.error === 'ok') {
        this.userService.setUser(this.usuario);
        this.userService.setCedula(response.datos[0][2]);
        this.userService.Guardarimagen(response.datos[0][3]);
        this.userService.setmembresia(response.datos[0][4]);
        this.userService.setContra(this.contrasena)
        this.router.navigate(['/rutinas']);
        if (this.rememberMe) {
          this.saveCredentials();
        } else {
          this.clearCredentials();
        }
      } else {
        this.presentToastInvalid();
      }
    } catch (error) {
      console.error(error);
      this.presentToastError();
    }
  }


  saveCredentials() {
    localStorage.setItem('username', this.usuario);
    localStorage.setItem('password', this.contrasena);
  }

  clearCredentials() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  loadSavedCredentials() {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    if (savedUsername && savedPassword) {
      this.usuario = savedUsername;
      this.contrasena = savedPassword;
      this.rememberMe = true;
    }
  }




  async presentToastUser() {
    const toast = await this.toastController.create({
      message: 'Debe ingresar un usuario valido.',
      duration: 1000
    });
    toast.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Debe ingresar el usuario y la contraseña.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastInvalid() {
    const toast = await this.toastController.create({
      message: 'Usuario o contraseña incorrectos.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'Error de conexión. Intente nuevamente más tarde.',
      duration: 2000
    });
    toast.present();
  }
}
