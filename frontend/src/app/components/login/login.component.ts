import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginForm!:FormGroup;
  /* Tuve que iniciar esto en falso, porque sinó me da error,
  es como que undefined no funca */
  enviado:boolean=false;
  constructor(
    private formBuilder: FormBuilder
  ) { }
  onSubmit() {
    console.log(this.loginForm);
    this.enviado=true;
}
  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      usuario:['', [Validators.required,Validators.minLength(6)]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });


  }

}
