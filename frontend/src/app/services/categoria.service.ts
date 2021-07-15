
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
	

	constructor(private http: HttpClient) { }

	pedirCategoria() {
		return this.http.get(environment.url + 'categorias');
	}
	
	pedirCategoriaFiltradosPorNombre(filtro: string, orden?: string) {
		if (orden) {
			return this.http.get(environment.url + 'categorias?nombre=' + filtro +'&page=0' + '&sort=' + orden);
		}
		return this.http.get(environment.url + 'categorias?nombre=' + filtro);
	}

	guardar(nuevoCategoria: any) {
		return this.http.post(environment.url + 'categorias', nuevoCategoria);
	}

	actualizar(categoria: any) {
		return this.http.put(environment.url + 'categorias/' + categoria.id, categoria);
	}

	get(id: string) {
		return this.http.get(environment.url + 'categorias/' + id);
	}

	delete(id: number) {
		return this.http.delete(environment.url + 'categorias/' + id);
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