import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { PageDataService } from '../../services/page-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  mensagemErro: string;
  login = {
    email: '',
    password: ''
  }
  constructor(private loginService: LoginService
    , private roteador: Router
    , private pageDataService: PageDataService) { }

  ngOnInit() {
    this.pageDataService
      .defineTitulo('Login - CMail');
  }

  handleLogin(formLogin: NgForm) {
    if (formLogin.valid) {
      this.loginService
        .logar(this.login)
        .subscribe(
          () => this.roteador.navigate(['/inbox'])
          ,
          (responseError: HttpErrorResponse) => {
            this.mensagemErro = ''
            if (responseError.status === 400)
              this.mensagemErro = "Usuário não encontrado"
            else {
              this.mensagemErro = "Ocorreu um erro inesperado"
            }
          })
    }
  }
}

