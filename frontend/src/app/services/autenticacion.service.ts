import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  
  private token!: string;

  constructor(private http: HttpClient) { }

  login(usuario : string, password :string){
    //Aca tenemos que hacer la peticion HTTP
    
    var tokenUsuario = "Basic" +  window.btoa(usuario + ":" + password)

    var opciones = {
      headers : new HttpHeaders({'Content-Type':  'application/json',
      authorization : 'Basic' +  window.btoa(usuario + ":" + password) })
    }
    console.log(opciones)
    return this.http.get("http://localhost:8080/",  opciones ).pipe(
      map((rta)=>{
        //Se loguea con exito
        console.log("pipe -> map");
        this.token=tokenUsuario;
        
        localStorage.setItem("usuario", JSON.stringify(rta));
        //console.log(rta);
        
      })
      
    );
    // this.http.get("http://localhost:8080/login", opciones).subscribe((rta) => {
    //   //se logueo con exito
    //   this.token=tokenUsuario;
    // }, (error) => {
    //   console.log(error);
    // });
  }

  get tokenAutorizado(){
    return this.token;
  }

  get usuarioLogueado(){
    return JSON.parse(localStorage.getItem("usuario") || '{}');
  }

  
}
