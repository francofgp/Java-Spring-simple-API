import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TextoService } from 'src/app/services/texto.service';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.css']
})
export class TextoComponent implements OnInit {

  filtrarTextoForm!: FormGroup;
	textos!: any;
	orderNombreDesc!: boolean;

  constructor(private servicioTextos: TextoService,
		private formBuilder: FormBuilder,
		private router : Router) { }

  ngOnInit() {
    this.filtrarTextoForm = this.formBuilder.group({
			filtro: ['']
		});

		// Debo pedir los dominios al backend
		this.cargarDatos();
  }


  cargarDatos() {
		this.servicioTextos.pedirTextos().subscribe((rta) => {
			console.log(rta);
			this.textos = rta;
		}, (error) => {
			console.log(error);
		});
	}

  nuevaPalabra() {
		this.router.navigate(["palabras" , "nuevo"]);
	}


	ver(id: number) {
		this.router.navigate(["palabras" , id]);
		//Router ir a /dominios/:id
	}

	get f() {
		return this.filtrarTextoForm.controls;
	}

	filtrar() {
		this.filtrarImpl(this.f.filtro.value);
	}

	filtrarImpl(valor: string, orden? : string) {
		this.servicioTextos.pedirTextosFiltradosPorNombre(valor, orden).subscribe((rta: any) => {
			console.log(rta);
			if (rta && rta.content) {
				this.textos = rta.content;	
			} else {
				this.textos = rta;
			}
		}, (error) => {
			console.log(error);
		});
	}

	limpiar() {
		this.f.filtro.setValue('');
		this.filtrar();
	}

	keyPress(evento: KeyboardEvent) {
		if (evento.keyCode === 13) {
			this.filtrarImpl(this.f.filtro.value);
		}
	}

	ordenar(estrategia: string) {
		if (estrategia === 'nombre') {
			this.orderNombreDesc = !this.orderNombreDesc;
			//llamar al metodo de filtrar 
			this.filtrarImpl(this.f.filtro.value, this.orderNombreDesc ? 'nombre,desc' : 'nombre,asc' );
			
		}
	}

}
