import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaixaDeEntradaComponent } from './caixa-de-entrada.component';
import { SharedComponentModule } from '../../components/shared-components.module';
import { CaixaDeEntradaRoutingModule } from './caixa-de-entrada-routing.module'
import { EmailService } from '../../services/email.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CaixaDeEntradaComponent
  ],
  imports: [
    CommonModule,
    CaixaDeEntradaRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedComponentModule
  ],
  providers:[
		EmailService
	]
})
export class CaixaDeEntradaModule { }
