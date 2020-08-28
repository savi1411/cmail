import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  // Cap. 41.2 - Exercício 5. Extra
  apiUrl = `${environment.apiUrl}login/`

  constructor(private http: HttpClient) { }

  logar(dadosLogin) {
    return this.http
      .post(this.apiUrl, dadosLogin)
      .pipe(
        map((response: any) => {
          localStorage.setItem('cmail-token', response.token);
          return response;
        })
      )
  }

}
