import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { PageDataService } from 'src/app/services/page-data.service';
import { HeaderDataService } from 'src/app/services/header-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({  
  templateUrl: './caixa-de-entrada.component.html',
  styleUrls: ['./caixa-de-entrada.component.css'],
  styles: [`
  ul, li {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`]
})
export class CaixaDeEntradaComponent implements OnInit {

  private _isNewEmailFormOpen = false;
  emailList$;// = [];
  email = {
    destinatario: '',
    assunto: '',
    conteudo: ''
  }

  termoParaFiltro: string = '';

  constructor(private emailService: EmailService, 
              private pageService: PageDataService,
              private headerService: HeaderDataService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    /*this.emailService.listar().subscribe(
      lista => {
        this.emailList = lista;
      }
    )*/

    this.emailList$ = this.route.snapshot.data.emails;//this.emailService.listar();
    this.pageService.defineTitulo('Caixa de entrada - CMail');

    this.headerService.valorDoFiltro.subscribe(novoValor => this.termoParaFiltro = novoValor);
  }

  get isNewEmailFormOpen() {
    return this._isNewEmailFormOpen;
  }

  toggleNewEmailForm() {
    this._isNewEmailFormOpen = !this._isNewEmailFormOpen;
  }

  handleNewEmail(formEmail:NgForm) {    

    if (formEmail.invalid) return;

    this.emailService
      .enviar(this.email)
      .subscribe(
        emailApi => {
          this.emailList$.push(this.email);
          this.email = {
            destinatario: '',
            assunto: '',
            conteudo: ''
          }
          formEmail.reset();
        }
        ,erro => console.error(erro)
      )
  }

  handleRemoveEmail(eventoVaiRemover, emailId) {
    console.log('Clicou no item.');

    if (eventoVaiRemover.status = 'removing') {
      this.emailService.deletar(emailId)
        .subscribe(
          res => {
            console.log(res);

            this.emailList$ = this.emailList$.filter(email => email.id != emailId);
          }
          ,err => console.log(err)
        )
    }

  }

  filtrarEmailsPorAssunto() {
    const termoParaFiltroEmMinusculo = this.termoParaFiltro.toLowerCase();

    return this.emailList$.filter(
      email => {
        const assunto = email.assunto.toLowerCase();
        return assunto.includes(termoParaFiltroEmMinusculo);
      }
    )
  }

}
