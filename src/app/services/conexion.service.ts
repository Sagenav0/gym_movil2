import { HttpClient, HttpParams } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  
  private _refresh$ = new Subject<void>() 

  get refresh$(){
    return this._refresh$
  }

  //url = "https://yeffer.000webhostapp.com/appyef"// Dirección de backend de la NUBE

  url = "http://127.0.0.1:80" // Dirección de backend LOCAL

  constructor(private http:HttpClient) { }

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

  consultaCorreo(correo: string): Observable<any> {
    return this.http.get(`${this.url}/consultaCorreo/${correo}`);
  }


  /* consultaCorreo(data:any):Observable<any>{
    console.log(data)
    return this.http
    .get(this.url+'/consultaCorreo/'+data)
  } */
  

  cambiarCorreo(dat:any):Observable<any>{
    return this.http
    .post(this.url+"/cambiarCorreo", JSON.stringify(dat))
    .pipe(tap(()=>{
        this.refresh$.next()
    }))
  }

  medidas():Observable<any>{
    return this.http
    .get(this.url+"/medidas")
  }


  validarCredenciales(usuario: string, contrasena: string ): Observable<any> {
    return this.http.get(`${this.url}/validarCredenciales/${usuario}/${contrasena}`);
    }
    

}