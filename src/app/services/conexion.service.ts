import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  
  private _refresh$ = new Subject<void>() 

  get refresh$(){
    return this._refresh$
  }


  url = "http://127.0.0.1:80" //Dirección de backend
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

  /* cambiarContra(dat: any): Observable<any> {
    return this.http.post<any>(this.url + '/cambiarContra', dat)
      .pipe(tap(() => {
        this.refresh$.next();
      }));
  } */
  

  cambiarCorreo(dat:any):Observable<any>{
    return this.http
    .post(this.url+"/cambiarCorreo", JSON.stringify(dat))
    .pipe(tap(()=>{
        this.refresh$.next()
    }))
  }


}