import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  verTextos() {
		this.router.navigate(["texto" ]);
	}
  verCategorias() {
    console.log("cate")
		this.router.navigate(["categoria" ]);
	}
  verIdiomas() {
		this.router.navigate(["idioma" ]);
	}
  verLogIn() {
		this.router.navigate(["login" ]);
	}

}
