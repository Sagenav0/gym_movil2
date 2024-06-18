import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  
  id_men: number = 0;
  idMembresia: number = 0;

  menuHabilitado: boolean = true;
  constructor( private userService: UserService) { }

  ngOnInit() {
    this.id_men = this.userService.getmembresia();
    this.userService.idMembresia$.subscribe(id => {
      this.idMembresia = id;
      console.log('ID de membresía recibido en MenuComponent:', this.idMembresia);
      // Puedes realizar otras operaciones con idMembresia aquí
    });
    
  
    console.log("el id del usuario es"+this.id_men);
  }
 

  

  //para permitir visualizar el menu en las interfaces
  mostrarMenu = true;
  

}