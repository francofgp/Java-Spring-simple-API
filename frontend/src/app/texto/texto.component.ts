import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TextoService } from 'src/app/services/texto.service';
import Swal from 'sweetalert2';

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

  constructor(private servicioTextos: TextoService,
		private formBuilder: FormBuilder,
		private router : Router) {
			this.today =new Date();

		 }

  ngOnInit() {
    this.filtrarTextoForm = this.formBuilder.group({
			filtro: [''],
			filtrlDate:['']
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
		if (estrategia === 'date') {
			console.log("estoy aca")
			console.log(this.f.filtroDate)

			/* this.orderNombreDesc = !this.orderNombreDesc;
			//llamar al metodo de filtrar 
			this.filtrarImpl(this.f.filtro.value, this.orderNombreDesc ? 'nombre,desc' : 'nombre,asc' ); */
			
		}
	}

	//Con esto consigo la fecha del Input Date, faltaria llamar al backm para que en funcion de la fecha me filtre
	selectDate(){
		console.log(this.today)
		this.ordenar("date")
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

}
