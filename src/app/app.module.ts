import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarComponent } from './registrar/registrar/registrar.component';
import { LoginComponent } from './login/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home/home.component';
import { NavbarComponent } from './common/nav/navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwtModule } from '@auth0/angular-jwt';
import { CheckPermissionsDirective } from './directives/checkpermissions.directive';
import { UsuariosComponent } from './admin/usuarios/usuarios/usuarios.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TiendaComponent } from './tienda/tienda.component';
import { ProductoComponent as CommonProduct } from './common/producto/producto.component';
import { ProductoComponent as AdminCommonProduct } from './common/admin/producto/producto.component';
import { FooterComponent } from './common/footer/footer.component';
import { CategoriaComponent } from './common/categoria/categoria.component';
import { AdministrarComponent } from './admin/administrar/administrar.component';
import { AdminProductoComponent } from './admin/admin-producto/admin-producto.component';
import { AdminCategoriaComponent } from './admin/admin-categoria/admin-categoria.component';
import { ToastComponent } from './common/toast/toast.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CheckPermissionsDirective,
    UsuariosComponent,
    TiendaComponent,
    CommonProduct,
    AdminCommonProduct,
    FooterComponent,
    CategoriaComponent,
    AdministrarComponent,
    AdminProductoComponent,
    AdminCategoriaComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['*'],
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [CheckPermissionsDirective],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
