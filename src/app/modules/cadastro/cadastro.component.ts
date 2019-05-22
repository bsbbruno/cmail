import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/utils/validators/CustomValidators';

@Component({
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'] 
})
export class CadastroComponent implements OnInit {
  
  mensagensErro;

  constructor(private http: HttpClient, private roteador: Router, private customValidators:CustomValidators) { }

  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required, this.customValidators.lowerCaseValidator]),
    senha: new FormControl('', [Validators.required]), 
    telefone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4}-?[0-9]{4}[0-9]?')]),
    avatar: new FormControl('',[Validators.required],[this.customValidators.imageValidator()]),
  });

  ngOnInit() {
  }

  validaImagem(campoFormulario: FormControl) {
    return this.http.head(campoFormulario.value, {observe: 'response'})
    .pipe(
      map((response: HttpResponseBase) => {
        return response.ok ? null : { urlInvalida: true }
      }),
      catchError((error) => {
        return [{ urlInvalida: true }]
      })
    );
  }

  handleCadastrarUsuario() {
    if (this.formCadastro.valid) {
      //console.log(this.formCadastro.value);

      const userData = new User(this.formCadastro.value);

      this.http
        .post('http://localhost:3200/users', userData)
        .subscribe(
          () => {
            console.log('Cadastrado com sucesso');
            this.formCadastro.reset();

            setTimeout(() => {
              this.roteador.navigate([''])
            }, 1000);

          }, (responseError: HttpErrorResponse) => {
            this.mensagensErro = responseError.error.body;
          }
        )

    } else {
      this.validarCampos();
    }
  }

  validarCampos() {
    Object.keys(this.formCadastro.controls).forEach(nomeCampo => {
      const control = this.formCadastro.get(nomeCampo);
      control.markAsTouched({ onlySelf: true });
    });
  }

}
