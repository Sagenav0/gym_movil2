import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.page.html',
  styleUrls: ['./rutinas.page.scss'],
  providers: [DatePipe]
})
export class RutinasPage implements OnInit {
  listaDeDatos: any[] = [];
  currentIndex: number = 0; // Índice de la tarjeta actual
  fecha: Date;
  formattedFecha: string = ''; // Asignar un valor predeterminado

  constructor(private conexionService: ConexionService, private datePipe: DatePipe) {
    // Formatear la fecha a español
    this.fecha = new Date();
    const formattedDate = this.datePipe.transform(this.fecha, 'EEEE', 'GMT+0', 'es-ES');
    this.formattedFecha = formattedDate ?? ''; 
  }

  ngOnInit() {
    this.obtenerRutinas();
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

  // Función para cambiar a la siguiente tarjeta
  siguienteTarjeta() {
    if (this.currentIndex < this.listaDeDatos.length - 1) {
      this.currentIndex++;
    } else {
      // Si llegamos al final, volvemos al inicio
      this.currentIndex = 0;
    }
  }

  // Función para cambiar a la tarjeta anterior
  anteriorTarjeta() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      // Si estamos al principio, vamos al final
      this.currentIndex = this.listaDeDatos.length - 1;
    }
  }
  
  esDomingo(): boolean {
    return this.formattedFecha.toLowerCase() === 'domingo';
  }
} 