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
  cedula= this.userService.getUser()

  constructor(private conexion: ConexionService,
              private userService: UserService) {
    
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
