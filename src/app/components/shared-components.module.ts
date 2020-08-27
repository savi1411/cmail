import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { CmailFormGroupComponent } from './cmail-form-group/cmail-form-group.component';
import { CmailFormFieldDirective } from './cmail-form-group/cmail-form-field.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    CmailFormGroupComponent,
    CmailFormFieldDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    CmailFormGroupComponent,
    CmailFormFieldDirective
  ]
})
export class SharedComponentModule { }
