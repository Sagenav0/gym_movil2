import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  Datoseditar: any[] = [];
  usuario = this.userService.getUser()
  telefono = "";
  constructor(
    private conexionService: ConexionService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.consultaEdit();
  }

  update_telefono(){}

  
  consultaEdit() {
    this.conexionService.Datosedit(this.usuario).subscribe(
      (datos: any[]) => {
        // guardamos los datos y convertimos todos los datos a mayúsculas
        this.Datoseditar = datos
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        // Aquí podemos agregar codigo para manejar el errores o mostrar un mensaje al usuario
      }
    );
  }
}
