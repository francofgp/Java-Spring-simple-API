import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { TextoService } from 'src/app/services/texto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;
  enviado! : boolean;

  constructor(
    private formBuilder: FormBuilder,
    private servicioAutenticacion: AutenticacionService,
    private servicioTexto: TextoService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario:['',[Validators.required,Validators.minLength(3)]],
      password:['',[Validators.required,Validators.minLength(3)]]
    });
  }

  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.enviado=true;
    
    this.servicioAutenticacion.login(this.f.usuario.value, this.f.password.value).subscribe((rta)=>{
      this.router.navigate(["inicio"]);      
    },(error)=>{
      console.log(error);
    });
  }

  /*
  pedirPalabras(){
    this.servicioPalabra.pedirPalabras();
  }*/

}
