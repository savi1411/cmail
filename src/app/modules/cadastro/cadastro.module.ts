import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro.component';
//Importação e referência ao HeaderComponent
import { HeaderComponent } from '../../components/header/header.component';
//Importação e referência ao CmailFormGroupComponent
import { CmailFormGroupComponent } from '../../components/cmail-form-group/cmail-form-group.component';  //Importação da referência

@NgModule({
  declarations: [
    CadastroComponent,
    HeaderComponent,
    CmailFormGroupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CadastroModule { }
