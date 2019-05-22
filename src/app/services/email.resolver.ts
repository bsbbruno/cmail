import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Email } from '../models/email';
import { EmailService } from './email.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EmailResolver implements Resolve<Observable<Email[]>> {
    
    constructor(private emailService:EmailService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Email[]> | Observable<Observable<Email[]>> | Promise<Observable<Email[]>> {
        return this.emailService.listar();

    }    
}