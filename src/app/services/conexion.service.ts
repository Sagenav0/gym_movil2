import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  url = "http://127.0.0.1:80" //Direccion BackEnd
  constructor(private http: HttpClient) { }

  medidas():Observable<any>{
    return this.http
    .get(this.url+"/medidas")
  }
}