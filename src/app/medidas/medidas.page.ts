import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';


@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.page.html',
  styleUrls: ['./medidas.page.scss'],
})
export class MedidasPage implements OnInit {
  medidas: any[] = []
  cedula="1616"

  constructor(private conexion: ConexionService) {
    
  }
  ngOnInit(){
    this.consultaMedidas();
  }
  
  consultaMedidas(){
    this.conexion.medidas().subscribe(
      data => {
        this.cedula=this.cedula
        this. medidas = data
      }
    )
  }
}
