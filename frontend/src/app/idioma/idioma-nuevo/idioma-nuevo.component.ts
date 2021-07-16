import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdiomaService } from 'src/app/services/idioma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-idioma-nuevo',
  templateUrl: './idioma-nuevo.component.html',
  styleUrls: ['./idioma-nuevo.component.css']
})
export class IdiomaNuevoComponent implements OnInit {


  formulario!: FormGroup;
	titulo!: string;
	modoNuevo!: boolean;
	idioma: any;
  enviado!: boolean;

	constructor(
		private formBuilder: FormBuilder,
		public rutaActiva: ActivatedRoute,
		public servicioIdioma: IdiomaService,
		public router: Router
	) { }

	ngOnInit() {

		this.titulo = this.rutaActiva.snapshot.params.id;
		console.log(this.rutaActiva)
		this.formulario = this.formBuilder.group({
			nombre: ['', [Validators.required, Validators.minLength(4)]],
		});
		if (this.rutaActiva.snapshot.params.id !== 'nuevo') { //Modo editar
			this.titulo = "Editar Idioma";
			this.modoNuevo = false;
			this.servicioIdioma.get(this.rutaActiva.snapshot.params.id).subscribe((rta: any) => {
				//completar el resto de los valores
				this.f.nombre.setValue(rta.nombre);
				this.idioma = rta;
			});
		} else {
			this.titulo = "Nuevo Idioma";
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
					var nuevoIdioma: any;
					nuevoIdioma = {};
					nuevoIdioma.nombre = this.f.nombre.value;
					console.log(nuevoIdioma)
					this.servicioIdioma.guardar(nuevoIdioma).subscribe((rta) => {
						this.router.navigate(["idioma"]);
					}, (error) => {
						alert('Error al cargar');
					});
				} else {
					//Actualizo el modelo de acuerdo a los valores de los input del formulario
					this.idioma.nombre = this.f.nombre.value;
					
					this.servicioIdioma.actualizar(this.idioma).subscribe((rta) => {
						Swal.fire({ icon: 'success', title: 'Exito', allowOutsideClick: false, text: 'Texto' });
						this.router.navigate(["idioma"]);
					}, (error) => {
						console.error(error);
						Swal.fire({ icon: 'error', title: 'Error!!', allowOutsideClick: false, text: error.message });
					});
				}
			}
		})




	}
}
