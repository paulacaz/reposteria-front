import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './registrar/registrar/registrar.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuardService } from './services/auth/authguard.service';
import { NoLoginGuardService } from './services/auth/nologin.service';
import { TiendaComponent } from './tienda/tienda.component';
import { AdministrarComponent } from './admin/administrar/administrar.component';

const routes: Routes = [
  {
    path: 'registrar',
    component: RegistrarComponent,
    canActivate: [NoLoginGuardService],
  },
  { path: 'inicio', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoLoginGuardService],
  },
  {
    path: 'administrador',
    component: AdministrarComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'tienda',
    component: TiendaComponent,
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
  providers : []
})
export class AppRoutingModule {}
