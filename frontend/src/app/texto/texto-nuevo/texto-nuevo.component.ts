import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TextoService } from 'src/app/services/texto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-texto-nuevo',
  templateUrl: './texto-nuevo.component.html',
  styleUrls: ['./texto-nuevo.component.css']
})
export class TextoNuevoComponent implements OnInit {

  formulario!: FormGroup;
	titulo!: string;
	modoNuevo!: boolean;
	texto: any;
  enviado!: boolean;

	constructor(
		private formBuilder: FormBuilder,
		public rutaActiva: ActivatedRoute,
		public servicioTexto: TextoService,
		public router: Router
	) { }

	ngOnInit() {

		this.titulo = this.rutaActiva.snapshot.params.id;
		console.log(this.rutaActiva)
		this.formulario = this.formBuilder.group({
			nombre: ['', [Validators.required, Validators.minLength(4)]],
		});
		if (this.rutaActiva.snapshot.params.id !== 'nuevo') { //Modo editar
			this.titulo = "Editar texto";
			this.modoNuevo = false;
			this.servicioTexto.get(this.rutaActiva.snapshot.params.id).subscribe((rta: any) => {
				//completar el resto de los valores
				this.f.nombre.setValue(rta.nombre);
				this.texto = rta;
			});
		} else {
			this.titulo = "Nuevo texto";
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
					var nuevoTexto: any;
					nuevoTexto = {};
					nuevoTexto.nombre = this.f.nombre.value;
					console.log(nuevoTexto)
					this.servicioTexto.guardar(nuevoTexto).subscribe((rta) => {
						this.router.navigate(["texto"]);
					}, (error) => {
						alert('Error al cargar');
					});
				} else {
					//Actualizo el modelo de acuerdo a los valores de los input del formulario
					this.texto.nombre = this.f.nombre.value;
					
					this.servicioTexto.actualizar(this.texto).subscribe((rta) => {
						Swal.fire({ icon: 'success', title: 'Exito', allowOutsideClick: false, text: 'Texto' });
						this.router.navigate(["texto"]);
					}, (error) => {
						console.error(error);
						Swal.fire({ icon: 'error', title: 'Error!!', allowOutsideClick: false, text: error.message });
					});
				}
			}
		})




	}
}
