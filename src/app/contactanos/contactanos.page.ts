import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';
import { from } from 'rxjs';
import { UserService } from '../user.service';


@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage implements OnInit {

  infogym: any[] = [];

  imagen: string = "";


  constructor(private conexionService: ConexionService,private userService: UserService) { }

  ngOnInit() {
    this.obtenerDatosGym();
    this.imagen = this.userService.MostrarImagen();
    console.log("imagen: "+this.imagen)
  }

  obtenerDatosGym() {
    this.conexionService.datosGym().subscribe(
      (datos: any[]) => {
        
        this.infogym = datos
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        
      }
    );
  }

 
}
