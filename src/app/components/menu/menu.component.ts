import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  menuHabilitado: boolean = true;
  constructor() { }

  ngOnInit() {}

  //para permitir visualizar el menu en las interfaces
  mostrarMenu = true;
  

}
