import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
//import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InterceptorHttpService } from './services/interceptor-http.service';
import { appRoutingModule } from './rutas/rutas-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ContactoComponent } from './contacto/contacto.component';
import { TextoComponent } from './texto/texto.component';
import { TextoNuevoComponent } from './texto/texto-nuevo/texto-nuevo.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaNuevoComponent } from './categoria/categoria-nuevo/categoria-nuevo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    //BodyComponent,
    FooterComponent,
    LoginComponent,
    InicioComponent,
    ContactoComponent,
    TextoComponent,
    TextoNuevoComponent,
    CategoriaComponent,
    CategoriaNuevoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass : InterceptorHttpService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
