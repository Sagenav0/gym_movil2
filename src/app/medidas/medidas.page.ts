import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';


@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.page.html',
  styleUrls: ['./medidas.page.scss'],
})
export class MedidasPage implements OnInit {

  medidas: any[] = []


  constructor(private conexion: ConexionService) { }

  ngOnInit() {
    this.visualizaDatos();
  }

  visualizaDatos(){
    this.conexion.medidas().subscribe(
      data => {
        this. medidas = data
      }
    )
  }


}
