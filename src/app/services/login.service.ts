import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api = 'http://localhost:3200/login';

  constructor(private http:HttpClient) { }

  logar(dadosLogin) {
    return this.http.post(this.api, dadosLogin)
      .pipe(
        tap( (response:any) => {
          localStorage.setItem('TOKEN', response.token);
          return response;
        })
      )
  }

}
