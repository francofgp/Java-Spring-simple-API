import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TextoService } from 'src/app/services/texto.service';
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/services/common.service';
import { CategoriaService } from '../services/categoria.service';
import { IdiomaService } from '../services/idioma.service';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.css']
})
export class TextoComponent implements OnInit {

  filtrarTextoForm!: FormGroup;
	textos!: any;
	orderNombreDesc!: boolean;
	today: Date;

	mySelect = 2;
	selectedValue: any;
	nombreCategoria:any;
	categorias!: any;


	mySelectIdioma = 2;
	selectedValueIdioma: any;
	nombreIdioma:any;
	idiomas!: any;

  constructor(private servicioTextos: TextoService,
		private formBuilder: FormBuilder,
		private router : Router,
		private commonService: CommonService,
		private servicioCategorias: CategoriaService,
		private servicioIdiomas: IdiomaService,

		) {
			this.today =new Date();

		 }

  ngOnInit() {
    this.filtrarTextoForm = this.formBuilder.group({
			filtro: [''],
			filtrlDate:['']
		});
	

		// Debo pedir los dominios al backend
		this.cargarDatos();
		this.cargarCategorias()
		this.cargarIdiomas()
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
		this.router.navigate(["texto" , "nuevo"]);
	}


	ver(id: number) {
		this.router.navigate(["texto" , id]);
		//Router ir a /dominios/:id
	}

	eliminar(id: number) {


		Swal.fire({
			title: 'Esta seguro que desea elimnar este registro?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si!'
		}).then((result) => {
			if (result.value) {
		this.servicioTextos.delete(id).subscribe((rta) => {
			this.servicioTextos.pedirTextos().subscribe((rta) => {
				console.log(rta);
				this.textos = rta;
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

	//Con esto consigo la fecha del Input Date, faltaria llamar al backm para que en funcion de la fecha me filtre
	selectDate(){
		console.log(this.today)
		console.log(this.f.filtro.value)
		this.filtrarTextoPorFechaModificacion(this.f.filtro.value,this.today)
	}

	filtrarTextoPorFechaModificacion(valor: string, fechaModificacion?:Date) {
		
		this.servicioTextos.pedirTextosFiltradosPorNombreYFechaModificacion(valor, fechaModificacion).subscribe((rta: any) => {
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

	filtrarTextoPorFecha(valor: string, orden? : string) {
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


	selectChangeCategoria() {
		console.log(this.mySelect)
		this.selectedValue = this.commonService.getDropDownText(this.mySelect, this.categorias)[0]//.nombre;
		console.log(this.commonService.getDropDownText(this.mySelect, this.categorias)[0])
		this.nombreCategoria=this.commonService.getDropDownText(this.mySelect, this.categorias)[0].nombre

		this.filtrarTextoNombreYcategoria(this.f.filtro.value,this.nombreCategoria)
	}

	filtrarTextoNombreYcategoria(valor: string, nombreCategoria?:string	) {
		
		this.servicioTextos.pedirTextosFiltradosPorNombreYCategoria(valor, nombreCategoria).subscribe((rta: any) => {
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


	filtrarTextoNombreEIdioma(valor: string, nombreIdioma?:string	) {
		
		this.servicioTextos.pedirTextosFiltradosPorNombreEIdioma(valor, nombreIdioma).subscribe((rta: any) => {
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
	
	cargarCategorias() {
		this.servicioCategorias.pedirCategoria().subscribe((rta) => {
			console.log(rta);
			this.categorias = rta;
		}, (error) => {
			console.log(error);
		});
	}



	selectChangeIdioma() {
		console.log(this.mySelectIdioma)
		this.selectedValueIdioma = this.commonService.getDropDownText(this.mySelectIdioma, this.idiomas)[0]//.nombre;
		console.log(this.selectedValueIdioma)

		console.log(this.commonService.getDropDownText(this.mySelectIdioma, this.idiomas)[0])
		this.nombreIdioma=this.commonService.getDropDownText(this.mySelectIdioma, this.idiomas)[0].nombre

		this.filtrarTextoNombreEIdioma(this.f.filtro.value,this.nombreIdioma)

	}

	cargarIdiomas() {
		this.servicioIdiomas.pedirIdioma().subscribe((rta) => {
			console.log(rta);
			this.idiomas = rta;
		}, (error) => {
			console.log(error);
		});
	}
}
