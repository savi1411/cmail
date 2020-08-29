import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Email } from '../models/email';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EmailService {

    // Cap. 41.2 - Exercício 5. Extra
    apiUrl = `${environment.apiUrl}emails/`
    cabecalho = new HttpHeaders({
        'Authorization': localStorage.getItem('cmail-token')
    });
    constructor(private http: HttpClient) { }

    enviar({ destinatario, assunto, conteudo }) {
        const emailParaApi = {
            to: destinatario,
            subject: assunto,
            content: conteudo
        }
        return this.http
            .post(this.apiUrl, emailParaApi, { headers: this.cabecalho })
            .pipe<Email>(
                map(
                    (emailApi: any) => {
                        return new Email({
                            destinatario: emailApi.to,
                            assunto: emailApi.subject,
                            conteudo: emailApi.content,
                            dataDeEnvio: emailApi.createdAt,
                            id: emailApi.id //mapeando o id vindo da API
                        })
                    }
                )
            )
    }

    listar() {
        return this.http
            .get(this.apiUrl, { headers: this.cabecalho })
            .pipe<Email[]>(
                map(
                    (response: any[]) => {
                        return response
                            .map(
                                emailApi => new Email({
                                    destinatario: emailApi.to,
                                    assunto: emailApi.subject,
                                    conteudo: emailApi.content,
                                    dataDeEnvio: emailApi.createdAt,
                                    id: emailApi.id //mapeando o id vindo da API
                                })
                            )
                    }
                )
            )
    }

    deletar(id) {
        return this
            .http
            .delete(`${this.apiUrl}${id}`, { headers: this.cabecalho })
    }
}