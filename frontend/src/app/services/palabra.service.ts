import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PalabraService {

  constructor(private http: HttpClient) { }

  pedirPalabras() {
    this.http.get("localhost:8080/palabras").subscribe((rta) => {
      console.log(rta);
    }, (error) => {
      console.log(error);
    });
  }
}
