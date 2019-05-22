import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    email: '',
    password: ''
  }
  mensagemErro;

  constructor(private service:LoginService, private router: Router) { }

  ngOnInit() {
  }

  handleLogin(formLogin: NgForm) {
    if(formLogin.valid) {
      this.service.logar(this.login)
          .subscribe(
            () => {
              this.router.navigate(['/inbox']); 
            },
            (responseError:HttpErrorResponse) => {
              this.mensagemErro = responseError.error;
            }
          )
    }
  }

}
