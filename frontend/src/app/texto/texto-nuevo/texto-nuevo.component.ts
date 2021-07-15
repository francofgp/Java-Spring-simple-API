import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TextoService } from 'src/app/services/texto.service';

import { CommonService } from 'src/app/services/common.service';

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
	categorias!: any;

	mySelect = 2;
	selectedValue: any;
	nombreCategoria:any;
	data = [
		{
		  id: 1,
		  name: 'Dakota Gaylord PhD',
		  address: '14554 Smith Mews'
		},
		{
		  id: 2,
		  name: 'Maria Legros',
		  address: '002 Pagac Drives'
		},
		{
		  id: 3,
		  name: 'Brandyn Fritsch',
		  address: '8542 Lowe Mountain'
		},
		{
		  id: 4,
		  name: 'Glenna Ward V',
		  address: '1260 Oda Summit'
		},
		{
		  id: 5,
		  name: 'Jamie Veum',
		  address: '5017 Lowe Route'
		}
	  ];
	constructor(
		private formBuilder: FormBuilder,
		public rutaActiva: ActivatedRoute,
		public servicioTexto: TextoService,
		private servicioCategorias: CategoriaService,
		public router: Router,
		private commonService: CommonService
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
				this.cargarCategorias()
				this.f.nombre.setValue(rta.nombre);
				if(rta.categoria){
					this.selectChangePorDefecto(rta.categoria)
				}
				
				//this.f.categoria.setValue(rta.categoria.id)
				this.texto = rta;
			});
		} else {
			this.titulo = "Nuevo texto";
			this.modoNuevo = true;
			this.cargarCategorias()
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
					console.log(this.selectedValue)
					nuevoTexto={...nuevoTexto,categoria:this.selectedValue}
					console.log(nuevoTexto)
					this.servicioTexto.guardar(nuevoTexto).subscribe((rta) => {
						this.router.navigate(["texto"]);
					}, (error) => {
						alert('Error al cargar');
					});
				} else {
					//Actualizo el modelo de acuerdo a los valores de los input del formulario
					this.texto.nombre = this.f.nombre.value;
					this.texto={...this.texto,categoria:this.selectedValue}
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

	cargarCategorias() {
		this.servicioCategorias.pedirCategoria().subscribe((rta) => {
			console.log(rta);
			this.categorias = rta;
		}, (error) => {
			console.log(error);
		});
	}

	selectChangePorDefecto(categoria) {
		console.log(categoria)
		this.selectedValue = this.commonService.getDropDownText(categoria.id, categoria)[0]//.nombre;
		this.mySelect=categoria.id
		console.log(this.selectedValue)
		this.nombreCategoria=categoria.nombre
		console.log(categoria.nombre)
	}

	selectChange() {
		console.log(this.mySelect)
		this.selectedValue = this.commonService.getDropDownText(this.mySelect, this.categorias)[0]//.nombre;
		console.log(this.commonService.getDropDownText(this.mySelect, this.categorias)[0])
		this.nombreCategoria=this.commonService.getDropDownText(this.mySelect, this.categorias)[0].nombre
	}
}
