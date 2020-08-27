import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedComponentModule } from 'src/app/components/shared-components.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, 
    LoginRoutingModule,
    HttpClientModule,
    SharedComponentModule,
    FormsModule
  ]
})
export class LoginModule { }
