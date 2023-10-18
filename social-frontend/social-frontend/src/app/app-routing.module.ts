import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { autenticacaoGuard } from './auth/autenticacao.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [autenticacaoGuard],
  },
  {
    path: 'cadastrar-usuario',
    loadComponent: () =>
      import(
        './usuarios/cadastrar-editar-usuario/cadastrar-editar-usuario.component'
      ).then((c) => c.CadastrarEditarUsuarioComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
