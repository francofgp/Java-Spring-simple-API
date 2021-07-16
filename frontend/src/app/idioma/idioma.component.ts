import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IdiomaService } from '../services/idioma.service';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.component.html',
  styleUrls: ['./idioma.component.css']
})
export class IdiomaComponent implements OnInit {

  filtrarIdiomaForm!: FormGroup;
	idiomas!: any;
	orderNombreDesc!: boolean;

  constructor(private servicioIdiomas: IdiomaService,
		private formBuilder: FormBuilder,
		private router : Router) { }

  ngOnInit() {
    this.filtrarIdiomaForm = this.formBuilder.group({
			filtro: ['']
		});

		// Debo pedir los dominios al backend
		this.cargarDatos();
  }


  cargarDatos() {
		this.servicioIdiomas.pedirIdioma().subscribe((rta) => {
			console.log(rta);
			this.idiomas = rta;
		}, (error) => {
			console.log(error);
		});
	}

  nuevaPalabra() {
		this.router.navigate(["idioma" , "nuevo"]);
	}


	ver(id: number) {
		this.router.navigate(["idioma" , id]);
		//Router ir a /dominios/:id
	}

	eliminar(id: number) {


		Swal.fire({
			title: 'Esta seguro que desea eliminar este registro?',
			text: "No será capaz de revertir esto!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si!'
		}).then((result) => {
			if (result.value) {
		this.servicioIdiomas.delete(id).subscribe((rta) => {
			this.servicioIdiomas.pedirIdioma().subscribe((rta) => {
				console.log(rta);
				this.idiomas = rta;
			}, (error) => {
				console.log(error);
			});
			
		}, (error) => {
			Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al eliminar este registro!',
        footer: 'Esto se debe a que este registro está vinculado con otro'
      })
		});
				 
			}
		})




		

		
		//this.router.navigate(["texto" , id]);
		//Router ir a /dominios/:id
	}

	get f() {
		return this.filtrarIdiomaForm.controls;
	}

	filtrar() {
		this.filtrarImpl(this.f.filtro.value);
	}

	filtrarImpl(valor: string, orden? : string) {
		this.servicioIdiomas.pedirIdiomaFiltradosPorNombre(valor, orden).subscribe((rta: any) => {
			console.log(rta);
			if (rta && rta.content) {
				this.idiomas = rta.content;	
			} else {
				this.idiomas = rta;
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
