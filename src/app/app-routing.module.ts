import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const rotas: Routes = [
  {
    path: 'cadastro',
    loadChildren: () => import('./modules/cadastro/cadastro.module').then(m => m.CadastroModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'inbox',
    //Guard aqui!
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/caixa-de-entrada/caixa-de-entrada.module').then(m => m.CaixaDeEntradaModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'inbox',
  //   pathMatch: 'full'
  // },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //Importou e leu rotas ⤵
    RouterModule.forRoot(rotas)
  ],
  //Exportou módulo configurado
  exports: [RouterModule],
  providers: [AuthGuard] //Guard aqui!
})
export class AppRoutingModule { }
