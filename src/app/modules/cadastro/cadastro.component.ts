import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { PageDataService } from '../../services/page-data.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4}-?[0-9]{4}[0-9]?')]),
    avatar: new FormControl('', [Validators.required], this.validaImagem.bind(this))
  })
  // Caso existam mensagens de erro na resposta
  mensagensErro: any;

  constructor(private httpClient: HttpClient
    , private roteador: Router
    , private pageDataService: PageDataService) { }

  ngOnInit() {
    this.pageDataService
      .defineTitulo('Cadastro - CMail');
  }

  handleCadastrarUsuario() {
    if (this.formCadastro.valid) {

      const userData = new User(this.formCadastro.value);
      // Cap. 41.2 - Exercício 5. Extra
      const apiUrl = `${environment.apiUrl}users/`

      this.httpClient
        .post(apiUrl, userData)
        .subscribe(
          () => {
            console.log(`Cadastrado com sucesso`);
            this.formCadastro.reset()

            //após 1 segundo, redireciona para a rota de login
            setTimeout(() => {
              this.roteador.navigate(['']);
            }, 1000);
          }
          , (responseError: HttpErrorResponse) => {
            //resposta caso existam erros!
            if (responseError.status === 400)
              this.mensagensErro = responseError.error.body
            else {
              this.mensagensErro = [
                {message: "Erro inesperado", value: "Falha na resposta do servidor"}
              ]
            }
          }
        )
    }
    else {
      this.validarTodosOsCamposDoFormulario(this.formCadastro);
    }
  }

  validarTodosOsCamposDoFormulario(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    })
  }

  validaImagem(campoDoFormulario: FormControl) {
    return this.httpClient
      .head(campoDoFormulario.value, {
        observe: 'response'
      })
      .pipe(
        map((response: HttpResponseBase) => {
          return response.ok ? null : { urlInvalida: true }
        }),
        catchError((error) => {
          return [{ urlInvalida: true }]
        })
      )
  }

}
