import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Email } from '../models/email';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  api = 'http://localhost:3200/emails';
  //cabecalho = new HttpHeaders({'Authorization': localStorage.getItem('TOKEN')});
  private emails: Email[];

  constructor(private http: HttpClient) { }

  enviar({destinatario, assunto, conteudo}){
    const emailParaApi = {
      to: destinatario,
      subject: assunto,
      content: conteudo
    }

    return this.http
               .post(this.api, emailParaApi)//, { headers: this.cabecalho })
               .pipe<Email>(
                 map(
                   (emailApi:any) => {
                     return new Email({
                       destinatario: emailApi.to,
                       assunto: emailApi.subject,
                       conteudo: emailApi.content,
                       dataDeEnvio: emailApi.created_at,
                       id: emailApi.id
                     })
                   })                  
                 )            
  }

  getById(id:string):Email {
    /*const url = `${this.api}/${id}`;
    return this.http
      .get<Email>(url, {headers: this.cabecalho});*/
    return this.emails.filter(email => email.id == id)[0];
  }

  listar() {
    return this.http
      .get(this.api)//, { headers: this.cabecalho })
      .pipe<Email[]>(
        map(
          (response:any[]) => {
            return response.map(
              
              emailApi => {
                console.log(emailApi.id);
                return new Email({
                  destinatario: emailApi.to,
                  assunto: emailApi.subject,
                  conteudo: emailApi.content,
                  dataDeEnvio: emailApi.created_at,
                  id: emailApi.id
                })
              }
            )
          }
        )        
      ).pipe(
        tap( listaEmails => this.emails = listaEmails)
      )
  }

  deletar(id) {
    return this.http.delete(`${this.api}/${id}`);//, { headers: this.cabecalho });
  }

}
