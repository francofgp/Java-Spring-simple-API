
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {
	

	constructor(private http: HttpClient) { }

	pedirIdioma() {
		return this.http.get(environment.url + 'idiomas');
	}
	
	pedirIdiomaFiltradosPorNombre(filtro: string, orden?: string) {
		if (orden) {
			return this.http.get(environment.url + 'idiomas?nombre=' + filtro +'&page=0' + '&sort=' + orden);
		}
		return this.http.get(environment.url + 'idiomas?nombre=' + filtro);
	}

	guardar(nuevoIdioma: any) {
		return this.http.post(environment.url + 'idiomas', nuevoIdioma);
	}

	actualizar(idioma: any) {
		return this.http.put(environment.url + 'idiomas/' + idioma.id, idioma);
	}

	get(id: string) {
		return this.http.get(environment.url + 'idiomas/' + id);
	}

	delete(id: number) {
		return this.http.delete(environment.url + 'idiomas/' + id);
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