import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ContactoComponent } from '../contacto/contacto.component';
import { InicioComponent } from '../inicio/inicio.component';
import { AuthGuard } from '../services/authguard.service';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "inicio", component: InicioComponent, canActivate:[AuthGuard]},
  {path: "contacto", component: ContactoComponent, canActivate:[AuthGuard]},
  {path: "**",redirectTo: "inicio"},

];

export const appRoutingModule = RouterModule.forRoot(routes);
