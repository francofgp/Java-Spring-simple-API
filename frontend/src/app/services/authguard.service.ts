import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private servicioAutenticacion : AutenticacionService, private router:Router) { }
  path!: ActivatedRouteSnapshot[];
  route!: ActivatedRouteSnapshot;

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
    let usuarioLogueado = this.servicioAutenticacion.usuarioLogueado;
    if(usuarioLogueado && usuarioLogueado.autenthicated){
      return true;
    }
    //Si no tiene TOKEN obligamos a ir al login
    this.router.navigate(["login"]);
    return false;
  }
}



