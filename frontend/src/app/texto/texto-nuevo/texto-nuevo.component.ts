import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TextoService } from 'src/app/services/texto.service';
import { DomSanitizer } from '@angular/platform-browser';

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

    URL:any;
	URLEmbebida:any;

	invalidaURL="Sin URL de youtube";
	booleanURL!: boolean; 
	
	constructor(
		private formBuilder: FormBuilder,
		public rutaActiva: ActivatedRoute,
		public servicioTexto: TextoService,
		private servicioCategorias: CategoriaService,
		private servicioIdiomas: IdiomaService,
		private _sanitizer: DomSanitizer,
		public router: Router,
		private commonService: CommonService
	) { }

	ngOnInit() {

		this.titulo = this.rutaActiva.snapshot.params.id;

		this.formulario = this.formBuilder.group({
			nombre: ['', [Validators.required, Validators.minLength(4)]],
			parrafo: ['', [Validators.required, Validators.minLength(4)]],
		youtubeURL: [''],
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
				this.f.youtubeURL.setValue(rta.youtubeURL)
				this.URL=this.matchYoutubeUrl(rta.youtubeURL)
				this.URLEmbebida=this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+ this.URL +"?rel=0")
				console.log(this.URLEmbebida)
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

	matchYoutubeUrl(url) {
		const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		if(url.match(p)){
			return url.match(p)[1];
		}
		return false;
	}

	onSubmit() {
		
		console.log(this.matchYoutubeUrl(this.f.youtubeURL.value))
		this.matchYoutubeUrl(this.f.youtubeURL.value)
		this.enviado=true;

		if (this.f.youtubeURL.value!==""){
			if(this.matchYoutubeUrl(this.f.youtubeURL.value)){
				this.booleanURL=false


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
								nuevoTexto={...nuevoTexto,youtubeURL:this.f.youtubeURL.value,categoria:this.selectedValue,idioma:this.selectedValueIdioma}
							
								this.servicioTexto.guardar(nuevoTexto).subscribe((rta) => {
									this.router.navigate(["texto"]);
								}, (error) => {
									alert('Error al cargar');
								});
							} else {
								//Actualizo el modelo de acuerdo a los valores de los input del formulario
								this.texto.nombre = this.f.nombre.value;
								this.texto.parrafo = this.f.parrafo.value;
								this.texto.youtubeURL = this.f.youtubeURL.value
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


			}else{
				this.booleanURL=true
				this.invalidaURL="URL inválida"
			}

		}else{
			this.booleanURL=false

			this.invalidaURL=""
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
							nuevoTexto={...nuevoTexto,youtubeURL:this.f.youtubeURL.value,categoria:this.selectedValue,idioma:this.selectedValueIdioma}
						
							this.servicioTexto.guardar(nuevoTexto).subscribe((rta) => {
								this.router.navigate(["texto"]);
							}, (error) => {
								alert('Error al cargar');
							});
						} else {
							//Actualizo el modelo de acuerdo a los valores de los input del formulario
							this.texto.nombre = this.f.nombre.value;
							this.texto.parrafo = this.f.parrafo.value;
							this.texto.youtubeURL = this.f.youtubeURL.value
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
		
			

		
		




	}

	cargarCategorias() {
		this.servicioCategorias.pedirCategoria().subscribe((rta) => {
			this.categorias = rta;
		}, (error) => {
			console.log(error);
		});
	}

	cargarIdiomas() {
		this.servicioIdiomas.pedirIdioma().subscribe((rta) => {
			this.idiomas = rta;
		}, (error) => {
			console.log(error);
		});
	}

	selectChangeCategoriaPorDefecto(categoria) {
		this.selectedValue = this.commonService.getDropDownText(categoria.id, categoria)[0]//.nombre;
		this.mySelect=categoria.id
		this.nombreCategoria=categoria.nombre
	}

	selectChangeCategoria() {
		this.selectedValue = this.commonService.getDropDownText(this.mySelect, this.categorias)[0]//.nombre;
		this.nombreCategoria=this.commonService.getDropDownText(this.mySelect, this.categorias)[0].nombre
	}

	selectChangeIdiomaPorDefecto(idioma) {
		this.selectedValueIdioma = this.commonService.getDropDownText(idioma.id, idioma)[0]//.nombre;
		this.mySelectIdioma=idioma.id
		this.nombreIdioma=idioma.nombre
	}

	selectChangeIdioma() {
		this.selectedValueIdioma = this.commonService.getDropDownText(this.mySelectIdioma, this.idiomas)[0]//.nombre;

		this.nombreIdioma=this.commonService.getDropDownText(this.mySelectIdioma, this.idiomas)[0].nombre
	}
}
