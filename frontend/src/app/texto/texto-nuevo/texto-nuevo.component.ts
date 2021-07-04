import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TextoService } from 'src/app/services/texto.service';

@Component({
  selector: 'app-texto-nuevo',
  templateUrl: './texto-nuevo.component.html',
  styleUrls: ['./texto-nuevo.component.css']
})
export class TextoNuevoComponent implements OnInit {

  formulario!: FormGroup;
	titulo!: string;
  enviado!: boolean;

	constructor(
		private formBuilder: FormBuilder,
		public rutaActiva: ActivatedRoute,
		public servicioDominio: TextoService
	) { }

	ngOnInit() {

		this.titulo = this.rutaActiva.snapshot.params.id;
		this.formulario = this.formBuilder.group({
			nombre: ['', [Validators.required, Validators.minLength(4)]],
		});
	}

	get f() {
		return this.formulario.controls;
	}

  onSubmit(
    
  ) {this.enviado = true;}
}
