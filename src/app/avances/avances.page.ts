import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';
import { UserService } from '../user.service';
import { ModalController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-avances',
  templateUrl: './avances.page.html',
  styleUrls: ['./avances.page.scss'],
})
export class AvancesPage implements OnInit {

  mes1!: string;
  mes2!: string;
  identificador = this.userService.getCedula();

  medidasMes1: any[] = [];
  medidasMes2: any[] = [];
  

  
  constructor(private conexionService: ConexionService,private userService: UserService,private toastController: ToastController,) { }

  ngOnInit() {
    this.identificador
   
  }

  onSubmit() {
      if(this.mes1){
        if (this.mes2){
          if(this.mes1 != this.mes2){
            this.conexionService.obtenerMedidas(this.mes1, this.mes2,this.identificador)
          .subscribe(data => {
            console.log('Medidas obtenidas:', data);
           
          // Suponiendo que data es un objeto con una propiedad 'medidas'
          const medidasArray = Object.values(data.medidas);
          const medidasMes1 = medidasArray
            .slice(0, medidasArray.length / 2)
            .join(',')
            .split(',')
            .map((valor, indice) => (indice === 0 ? valor + ' Kg' : valor + ' Cm'));
    
          const medidasMes2 = medidasArray
            .slice(medidasArray.length / 2)
            .join(',')
            .split(',')
            .map((valor, indice) => (indice === 0 ? valor + ' Kg' : valor + ' Cm'));
    
          this.medidasMes1 = medidasMes1;
          this.medidasMes2 = medidasMes2;
    
          console.log('Medidas Array 1:', this.medidasMes1);
          console.log('Medidas Array 2:', this.medidasMes2);
    
          console.log(this.items);
          
    
          });
          }else{
            this.presentToast('el valor de ambos meses no puede ser igual')
          }
          
        }else{
          this.presentToast('selecione un valor para el mes 2')
        }
      }else{
        this.presentToast('selecione un valor para el mes 1')
      }
   
    }

    items = ['Peso Corporal', 'Bicep Derecho', 'Bicep Izquierdo', 'Pecho', 'Antebrazo Derecho', 'Antebrazo Izquierdo', 'Cintura', 'Cadera', 'Muslo Derecho', 'Muslo Izquierdo', 'Pantorilla Derecha', 'Pantorilla Izquierda'];
    
  // medidas = ['80 Kg', '20 Cm', '20 Cm', '200 Cm', '15 Cm', '15 Cm', '250 Cm', '110 Cm', '110 Cm', '60 Cm', '60 Cm'];

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }  

}
