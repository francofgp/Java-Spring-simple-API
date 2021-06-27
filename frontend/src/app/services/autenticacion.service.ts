import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AutenticacionService {

	private token!: string;

	constructor(private http: HttpClient) { }

	login(usuario: string, pass: string) {

		var tokenUsuario = 'Basic ' + window.btoa(usuario + ':' + pass);

		var opciones = {
			headers: new HttpHeaders({ 'Authorization': tokenUsuario })
		}

		return this.http.get<any>(environment.url + 'login', opciones).pipe(
			map((rta) => {
				console.log(rta);
				this.token = tokenUsuario;
			})
		);
	}

	get tokenAutorizado() {
		return this.token;
	}

}