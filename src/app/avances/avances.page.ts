import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';
@Component({
  selector: 'app-avances',
  templateUrl: './avances.page.html',
  styleUrls: ['./avances.page.scss'],
})
export class AvancesPage implements OnInit {
  selectedMonth1!: string;
  selectedMonth2!: string;

  medidasMes1: any[] = [];
  medidasMes2: any[] = [];

  
  constructor(private conexionService: ConexionService) { }

  onSubmit() {
    console.log('Mes 1 seleccionado:', this.selectedMonth1);
    console.log('Mes 2 seleccionado:', this.selectedMonth2);
    
    this.conexionService.obtenerMedidas(this.selectedMonth1, this.selectedMonth2)
      .subscribe(data => {
        console.log('Medidas obtenidas:', data);

        const fechaOriginal = data['medidas'][0][4];
        const fecha = new Date(fechaOriginal);
        const fechaFormateadaMes1 = fecha.toISOString().split('T')[0];
        console.log(fechaFormateadaMes1);

        const valor = data['medidas'][0][4];
        console.log('mes',valor);
        
        
        // this.medidasMes1 = data['medidas'].filter((medida: any) => medida.mes_registro === parseInt(this.selectedMonth1));
        // this.medidasMes2 = data['medidas'].filter((medida: any) => medida.mes_registro === parseInt(this.selectedMonth2));
        
        console.log(this.medidasMes1);
        console.log(this.medidasMes2);
        
      });
  }

  items = ['Peso Corporal', 'Bicep Derecho', 'Bicep Izquierdo', 'Pecho', 'Antebrazo Derecho', 'Antebrazo Izquierdo', 'Cadera', 'Muslo Derecho', 'Muslo Izquierdo', 'Pantorilla Derecha', 'Pantorilla Izquierda'];

  // medidas = ['80 Kg', '20 Cm', '20 Cm', '200 Cm', '15 Cm', '15 Cm', '250 Cm', '110 Cm', '110 Cm', '60 Cm', '60 Cm'];

  ngOnInit() {
  }

}
