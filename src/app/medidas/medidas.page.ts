import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.page.html',
  styleUrls: ['./medidas.page.scss'],
})
export class MedidasPage implements OnInit {
  medidas: any[] = []
  // identificador = this.userService.getCedula();
  identificador = 16161;
  constructor(
    private conexion: ConexionService,
    private userService: UserService,
  ) {
    
  }
  ngOnInit(){
    this.consultaMedidas();
  }
  
  consultaMedidas(){
    this.conexion.Medidas(this.identificador).subscribe(
      datos => {
        this.identificador=this.identificador
        this.medidas = datos
        console.log(this.medidas)
      }
    )
  }
}
