import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PageDataService } from '../../services/page-data.service';
import { HeaderDataService } from '../../services/header-data.service';

@Component({
  selector: 'cmail-caixa-de-entrada',
  templateUrl: './caixa-de-entrada.component.html',
  styles: [`
    ul, li {
    margin: 0;
    padding: 0;
    list-style-type: none;
    }
  `]
})
export class CaixaDeEntradaComponent {
  termoParaFiltro: string = '';

  //Injetar EmailService e PageDataService
  constructor(private emailService: EmailService,
    private pageDataService: PageDataService,
    private headerDataService: HeaderDataService) { }

  ngOnInit() {
    this.emailService
      .listar()
      .subscribe(
        lista => {
          this.emailList = lista;
        })
    this.pageDataService
      .defineTitulo('Caixa de entrada - CMail');
    this.headerDataService
      .valorDoFiltro
      .subscribe(novoValor => this.termoParaFiltro = novoValor)
  }

  private _isNewEmailFormOpen = false;

  // Cap. 41.2 - Exercício 4. Extra
  mensagemErro: any;

  emailList = [];
  email = {
    destinatario: '',
    assunto: '',
    conteudo: ''
  }

  get isNewEmailFormOpen() {
    return this._isNewEmailFormOpen;
  }

  toggleNewEmailForm() {
    this._isNewEmailFormOpen = !this.isNewEmailFormOpen
  }

  handleNewEmail(formEmail: NgForm) {

    if (formEmail.invalid) return;

    this.emailService
      .enviar(this.email)
      .subscribe(
        emailApi => {
          //Fazemos todas as outras operações após o OK da API
          this.emailList.push(emailApi)
          this.email = { destinatario: '', assunto: '', conteudo: '' }
          formEmail.reset();
        }
        // Cap. 41.2 - Exercício 4. Extra
        , (responseError: HttpErrorResponse) => this.mensagemErro = responseError.error
      )
  }

  handleRemoveEmail(eventoVaiRemover, emailId) {
    console.log(eventoVaiRemover);
    if (eventoVaiRemover.status === 'removing') {
      //O próximo passo é apagar da API! :)
      this.emailService
        .deletar(emailId)
        .subscribe(
          res => {
            console.log(res);
            //remove o email da lista de emails depois dela ser apagada da API
            this.emailList = this.emailList.filter(email => email.id != emailId);
          }
          , err => console.error(err)
        )
    }
  }

  filtrarEmailsPorAssunto() {
    const termoParaFiltroEmMinusculo = this.termoParaFiltro.toLowerCase();
    return this.emailList.filter(email => {
      const assunto = email.assunto.toLowerCase()
      return assunto.includes(termoParaFiltroEmMinusculo)
    })
  }

}

