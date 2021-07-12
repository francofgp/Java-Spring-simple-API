
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

	guardar(nuevoTexto: any) {
		return this.http.post(environment.url + 'textos', nuevoTexto);
	}

	actualizar(texto: any) {
		return this.http.put(environment.url + 'textos/' + texto.id, texto);
	}

	get(id: string) {
		return this.http.get(environment.url + 'textos/' + id);
	}

	delete(id: number) {
		return this.http.delete(environment.url + 'textos/' + id);
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