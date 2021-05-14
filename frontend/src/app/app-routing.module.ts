import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriarLojaComponent } from './pages/criar-loja/criar-loja.component';
import { LoginComponent } from './pages/login/login.component';
import { LojasComponent } from './pages/lojas/lojas.component';
import { MinhasLojasComponent } from './pages/minhas-lojas/minhas-lojas.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "registrar", component: RegistrarComponent},
  {path: "lojas", component: LojasComponent},
  {path: "criar-loja", component: CriarLojaComponent},
  {path: "minhas-loja", component: MinhasLojasComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
