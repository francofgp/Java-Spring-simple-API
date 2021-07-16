import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ContactoComponent } from '../contacto/contacto.component';
import { InicioComponent } from '../inicio/inicio.component';
import { AuthGuard } from '../services/authguard.service';
import { TextoNuevoComponent } from '../texto/texto-nuevo/texto-nuevo.component';
import { TextoComponent } from '../texto/texto.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { CategoriaNuevoComponent } from '../categoria/categoria-nuevo/categoria-nuevo.component';
import { IdiomaComponent } from '../idioma/idioma.component';
import { IdiomaNuevoComponent } from '../idioma/idioma-nuevo/idioma-nuevo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'contacto', component: ContactoComponent, canActivate: [AuthGuard] },
  { path: 'texto', component: TextoComponent, canActivate: [AuthGuard] },
  { path: 'texto/:id', component: TextoNuevoComponent, canActivate: [AuthGuard] },
  { path: 'categoria', component: CategoriaComponent, canActivate: [AuthGuard] },
  { path: 'categoria/:id', component: CategoriaNuevoComponent, canActivate: [AuthGuard] },
  { path: 'idioma', component: IdiomaComponent, canActivate: [AuthGuard] },
  { path: 'idioma/:id', component: IdiomaNuevoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'inicio' },
];

export const appRoutingModule = RouterModule.forRoot(routes);
