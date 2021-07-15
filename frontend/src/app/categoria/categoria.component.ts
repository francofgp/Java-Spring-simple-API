import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  filtrarCategoriaForm!: FormGroup;
	categorias!: any;
	orderNombreDesc!: boolean;

  constructor(private servicioCategorias: CategoriaService,
		private formBuilder: FormBuilder,
		private router : Router) { }

  ngOnInit() {
    this.filtrarCategoriaForm = this.formBuilder.group({
			filtro: ['']
		});

		// Debo pedir los dominios al backend
		this.cargarDatos();
  }


  cargarDatos() {
		this.servicioCategorias.pedirCategoria().subscribe((rta) => {
			console.log(rta);
			this.categorias = rta;
		}, (error) => {
			console.log(error);
		});
	}

  nuevaPalabra() {
		this.router.navigate(["categoria" , "nuevo"]);
	}


	ver(id: number) {
		this.router.navigate(["categoria" , id]);
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
		this.servicioCategorias.delete(id).subscribe((rta) => {
			this.servicioCategorias.pedirCategoria().subscribe((rta) => {
				console.log(rta);
				this.categorias = rta;
			}, (error) => {
				console.log(error);
			});
			
		}, (error) => {
			alert('Error al eliminar');
		});
				 
			}
		})




		

		
		//this.router.navigate(["texto" , id]);
		//Router ir a /dominios/:id
	}

	get f() {
		return this.filtrarCategoriaForm.controls;
	}

	filtrar() {
		this.filtrarImpl(this.f.filtro.value);
	}

	filtrarImpl(valor: string, orden? : string) {
		this.servicioCategorias.pedirCategoriaFiltradosPorNombre(valor, orden).subscribe((rta: any) => {
			console.log(rta);
			if (rta && rta.content) {
				this.categorias = rta.content;	
			} else {
				this.categorias = rta;
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
