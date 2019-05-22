import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './modules/login/login.component';
import { CaixaDeEntradaComponent } from './modules/caixa-de-entrada/caixa-de-entrada.component';
import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { NotFoundComponent } from './modules/errors/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { CadastroRoutingModule } from './modules/cadastro/cadastro-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { DetalheEmailComponent } from './modules/detalhe-email/detalhe-email.component';
import { EmailResolver } from './services/email.resolver';

const routes: Routes = [
    {path: '', loadChildren: 'src/app/modules/login/login.module#LoginModule'},
    {
        path: 'inbox', 
        component: CaixaDeEntradaComponent, 
        canActivate: [AuthGuard],
        resolve: {
            emails: EmailResolver
        }
    },
    {path: 'inbox/:id', component: DetalheEmailComponent},
    {path: 'cadastro', loadChildren: 'src/app/modules/cadastro/cadastro.module#CadastroModule'},    
    {path: '**', component: NotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class ModuloRoteamento{}

//export const ModuloRoteamento = RouterModule.forRoot(routes);