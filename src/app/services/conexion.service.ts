import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  
  private _refresh$ = new Subject<void>() 

  get refresh$(){
    return this._refresh$
  }

  url = "https://yeffer.000webhostapp.com/appyef"// Dirección de backend de la NUBE

  //url = "http://127.0.0.1:80" // Dirección de backend LOCAL

  constructor(private http:HttpClient) { }

 
  // validarCredenciales(usuario: string, password: string): Observable<any> {
  //   return this.http.post<any>(this.url + '/validarCredenciales', { usuario, password })
  //     .pipe(
  //       catchError(error => {
  //         // Manejar el error aquí, por ejemplo, mostrar un mensaje de error
  //         console.error('Error al validar credenciales:', error);
  //         return of({ error: 'Ha ocurrido un error al validar credenciales' });
  //       })
  //     );
  // }

  validarCredenciales(usuario: string, contrasena: string ): Observable<any> {
    return this.http.get(`${this.url}/validarCredenciales/${usuario}/${contrasena}`);
    }
    

  consultaDatos():Observable<any>{
    return this.http
    .get(this.url+'/consultaDatos')
  }

  cambiarContra(dat:any):Observable<any>{
    return this.http
    .post(this.url+"/cambiarContra", JSON.stringify(dat))
    .pipe(tap(()=>{
        this.refresh$.next()
    }))
  } 

  
  medidas():Observable<any>{
    return this.http
    .get(this.url+"/medidas")
  }
 

  cambiarCorreo(dat:any):Observable<any>{
    return this.http
    .post(this.url+"/cambiarCorreo", JSON.stringify(dat))
    .pipe(tap(()=>{
        this.refresh$.next()
    }))
  }

  datosGym(): Observable<any[]> {
    return this.http
      .get<any[]>(this.url + '/consultaDatosgym');
  }
}


