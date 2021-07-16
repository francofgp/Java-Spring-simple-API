import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TextoService } from 'src/app/services/texto.service';

import { CommonService } from 'src/app/services/common.service';

import Swal from 'sweetalert2';
import { IdiomaService } from 'src/app/services/idioma.service';

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
	idiomas!: any;

	mySelect = 2;
	selectedValue: any;
	nombreCategoria:any;

	mySelectIdioma = 2;
	selectedValueIdioma: any;
	nombreIdioma:any;
	
	constructor(
		private formBuilder: FormBuilder,
		public rutaActiva: ActivatedRoute,
		public servicioTexto: TextoService,
		private servicioCategorias: CategoriaService,
		private servicioIdiomas: IdiomaService,

		public router: Router,
		private commonService: CommonService
	) { }

	ngOnInit() {

		this.titulo = this.rutaActiva.snapshot.params.id;
		console.log(this.rutaActiva)
		this.formulario = this.formBuilder.group({
			nombre: ['', [Validators.required, Validators.minLength(4)]],
			parrafo: ['', [Validators.required, Validators.minLength(4)]],
		});
		if (this.rutaActiva.snapshot.params.id !== 'nuevo') { //Modo editar
			this.titulo = "Editar texto";
			this.modoNuevo = false;
			this.servicioTexto.get(this.rutaActiva.snapshot.params.id).subscribe((rta: any) => {
				//completar el resto de los valores
				this.cargarCategorias()
				this.cargarIdiomas()
				this.f.nombre.setValue(rta.nombre);
				this.f.parrafo.setValue(rta.parrafo);

				if(rta.categoria){
					this.selectChangeCategoriaPorDefecto(rta.categoria)
				}
				if(rta.idioma){
					this.selectChangeIdiomaPorDefecto(rta.idioma)
				}
				
				//this.f.categoria.setValue(rta.categoria.id)
				this.texto = rta;
			});
		} else {
			this.titulo = "Nuevo texto";
			this.modoNuevo = true;
			this.cargarCategorias()
			this.cargarIdiomas()

		}
	}

	get f() {
		return this.formulario.controls;
	}

	onSubmit() {
		this.enviado=true;
		if(this.f.nombre.value.length >4 && this.f.parrafo.value.length>10){
			Swal.fire({
				title: 'Esta seguro que desea continuar?',
				text: "",
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
						nuevoTexto.parrafo = this.f.parrafo.value;
	
						console.log(nuevoTexto)
						console.log(this.selectedValue)
						nuevoTexto={...nuevoTexto,categoria:this.selectedValue,idioma:this.selectedValueIdioma}
						console.log(nuevoTexto)
						this.servicioTexto.guardar(nuevoTexto).subscribe((rta) => {
							this.router.navigate(["texto"]);
						}, (error) => {
							alert('Error al cargar');
						});
					} else {
						//Actualizo el modelo de acuerdo a los valores de los input del formulario
						this.texto.nombre = this.f.nombre.value;
						this.texto.parrafo = this.f.parrafo.value;
	
						this.texto={...this.texto,categoria:this.selectedValue,idioma:this.selectedValueIdioma}
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

	cargarCategorias() {
		this.servicioCategorias.pedirCategoria().subscribe((rta) => {
			console.log(rta);
			this.categorias = rta;
		}, (error) => {
			console.log(error);
		});
	}

	cargarIdiomas() {
		this.servicioIdiomas.pedirIdioma().subscribe((rta) => {
			console.log(rta);
			this.idiomas = rta;
		}, (error) => {
			console.log(error);
		});
	}

	selectChangeCategoriaPorDefecto(categoria) {
		console.log(categoria)
		this.selectedValue = this.commonService.getDropDownText(categoria.id, categoria)[0]//.nombre;
		this.mySelect=categoria.id
		console.log(this.selectedValue)
		this.nombreCategoria=categoria.nombre
		console.log(categoria.nombre)
	}

	selectChangeCategoria() {
		console.log(this.mySelect)
		this.selectedValue = this.commonService.getDropDownText(this.mySelect, this.categorias)[0]//.nombre;
		console.log(this.commonService.getDropDownText(this.mySelect, this.categorias)[0])
		this.nombreCategoria=this.commonService.getDropDownText(this.mySelect, this.categorias)[0].nombre
	}

	selectChangeIdiomaPorDefecto(idioma) {
		console.log(idioma)
		this.selectedValueIdioma = this.commonService.getDropDownText(idioma.id, idioma)[0]//.nombre;
		this.mySelectIdioma=idioma.id
		console.log(this.selectedValueIdioma)
		this.nombreIdioma=idioma.nombre
		console.log(idioma.nombre)
	}

	selectChangeIdioma() {
		console.log(this.mySelectIdioma)
		this.selectedValueIdioma = this.commonService.getDropDownText(this.mySelectIdioma, this.idiomas)[0]//.nombre;
		console.log(this.selectedValueIdioma)

		console.log(this.commonService.getDropDownText(this.mySelectIdioma, this.idiomas)[0])
		this.nombreIdioma=this.commonService.getDropDownText(this.mySelectIdioma, this.idiomas)[0].nombre
	}
}
