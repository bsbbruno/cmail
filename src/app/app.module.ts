import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CaixaDeEntradaComponent } from './modules/caixa-de-entrada/caixa-de-entrada.component';
import { LoginComponent } from './modules/login/login.component';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { ModuloRoteamento } from './app-routing.module';
import { NotFoundComponent } from './modules/errors/not-found/not-found.component';
import { CmailFormGroupComponent } from './components/cmail-form-group/cmail-form-group.component';
import { CmailFormFieldDirective } from './components/cmail-form-group/cmail-form-field.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CadastroModule } from './modules/cadastro/cadastro.module';
import { SharedComponentsModule } from './components/shared-components.module';
import { FiltroPorAssuntoPipe } from './modules/caixa-de-entrada/filtro-por-assunto.pipe';
import { DetalheEmailModule } from './modules/detalhe-email/detalhe-email.module';
import { RequestInterceptor } from './services/request.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CaixaDeEntradaComponent,
    NotFoundComponent,
    FiltroPorAssuntoPipe    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModuloRoteamento,    
    HttpClientModule,
    SharedComponentsModule,
    DetalheEmailModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
