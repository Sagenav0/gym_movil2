import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage implements OnInit {
  listaDeDatos: any[] = [];

  constructor(private conexionService: ConexionService) { }

  ngOnInit() {
    this.obtenerDatosGym();
  }

  obtenerDatosGym() {
    // Llama al servicio para obtener los datos
    this.conexionService.datosGym().subscribe(
      (datos: any[]) => {
        this.listaDeDatos = datos;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        // Aquí puedes agregar código para manejar el error, como mostrar un mensaje al usuario
      }
    );
  }
}