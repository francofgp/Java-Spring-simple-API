import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']

})

export class HeaderComponent{
    constructor(private router : Router) { }


    verInicio() {
		this.router.navigate(["inicio" ]);
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
}