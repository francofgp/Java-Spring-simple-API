
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TextoService {

	constructor(private http: HttpClient) { }

	pedirTextos() {
		return this.http.get(environment.url + 'textos');
	}
	
	pedirTextosFiltradosPorNombre(filtro: string, orden?: string) {
		if (orden) {
			return this.http.get(environment.url + 'textos?nombre=' + filtro +'&page=0' + '&sort=' + orden);
		}
		return this.http.get(environment.url + 'textos?nombre=' + filtro);
	}

	/*
	pedirTextos() {
		this.http.get(environment.url + 'textos').subscribe((rta) => {
			console.log(rta);
		}, (error) => {
			console.log(error);
		});
	}*/
}