import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';
import { ConexionService } from '../services/conexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.page.html',
  styleUrls: ['./rutinas.page.scss'],
  providers: [DatePipe]
})
export class RutinasPage implements OnInit {
  listaDeDatos: any[] = [];
  currentIndex: number = 0; 
  fecha: Date;
  formattedFecha: string = ''; 
  conteo: number = 1;
  imagen: string = "";
  

  constructor(
    private datePipe: DatePipe,
    private userService: UserService,
    private conexionService: ConexionService,
    private router: Router
  ) {
    this.fecha = new Date();
    const formattedDate = this.datePipe.transform(this.fecha, 'EEEE', 'GMT+0', 'es-ES');
    this.formattedFecha = formattedDate ?? '';
  }

  ngOnInit() {
    this.obtenerRutinas();
    this.imagen = this.userService.MostrarImagen();
  }

  obtenerRutinas() {
    this.conexionService.Rutinas().subscribe(
      (datos: any[]) => {
        this.listaDeDatos = datos;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  siguienteTarjeta() {
    if (this.currentIndex < this.listaDeDatos.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  anteriorTarjeta() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  incrementarConteo() {
    if (this.conteo < this.listaDeDatos.length) {
      this.conteo++;
    } else {
      this.conteo = 1; 
    }
  }

  desincrementarConteo() {
    if (this.conteo > 1) {
      this.conteo--;
    }
  }
}