import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'cmail-form-group',
  templateUrl: './cmail-form-group.component.html',
  styles: []
})

export class CmailFormGroupComponent implements OnInit {
  textoDaLabel = '';
  idCampo = '';

  constructor(private elemento: ElementRef) { }
  
  ngOnInit() {
    const campo = this.elemento.nativeElement.querySelector('input')
    this.textoDaLabel = campo.name.replace(campo.name[0], campo.name[0].toUpperCase());
    this.idCampo = campo.name;
  }
}