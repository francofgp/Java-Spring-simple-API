import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-nuevo',
  templateUrl: './categoria-nuevo.component.html',
  styleUrls: ['./categoria-nuevo.component.css']
})
export class CategoriaNuevoComponent implements OnInit {

  formulario!: FormGroup;
	titulo!: string;
	modoNuevo!: boolean;
	categoria: any;
  enviado!: boolean;

	constructor(
		private formBuilder: FormBuilder,
		public rutaActiva: ActivatedRoute,
		public servicioCategoria: CategoriaService,
		public router: Router
	) { }

	ngOnInit() {

		this.titulo = this.rutaActiva.snapshot.params.id;
		console.log(this.rutaActiva)
		this.formulario = this.formBuilder.group({
			nombre: ['', [Validators.required, Validators.minLength(4)]],
		});
		if (this.rutaActiva.snapshot.params.id !== 'nuevo') { //Modo editar
			this.titulo = "Editar Categoria";
			this.modoNuevo = false;
			this.servicioCategoria.get(this.rutaActiva.snapshot.params.id).subscribe((rta: any) => {
				//completar el resto de los valores
				this.f.nombre.setValue(rta.nombre);
				this.categoria = rta;
			});
		} else {
			this.titulo = "Nueva categoria";
			this.modoNuevo = true;
		}
	}

	get f() {
		return this.formulario.controls;
	}

	onSubmit() {

		Swal.fire({
			title: 'Esta seguro que desea continuar?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, claro!'
		}).then((result) => {
			if (result.value) {
				//Me fijo en el modo de pantalla
				
				if (this.modoNuevo) {
					var nuevaCategoria: any;
					nuevaCategoria = {};
					nuevaCategoria.nombre = this.f.nombre.value;
					console.log(nuevaCategoria)
					this.servicioCategoria.guardar(nuevaCategoria).subscribe((rta) => {
						this.router.navigate(["categoria"]);
					}, (error) => {
						alert('Error al cargar');
					});
				} else {
					//Actualizo el modelo de acuerdo a los valores de los input del formulario
					this.categoria.nombre = this.f.nombre.value;
					
					this.servicioCategoria.actualizar(this.categoria).subscribe((rta) => {
						Swal.fire({ icon: 'success', title: 'Exito', allowOutsideClick: false, text: 'Texto' });
						this.router.navigate(["categoria"]);
					}, (error) => {
						console.error(error);
						Swal.fire({ icon: 'error', title: 'Error!!', allowOutsideClick: false, text: error.message });
					});
				}
			}
		})




	}
}
