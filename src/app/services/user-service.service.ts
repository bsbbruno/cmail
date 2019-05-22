import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private user$ = new BehaviorSubject<User>(null);// Primeiro valor a ser emitido //new Subject<User>();

  constructor() {
    this.hasToken() && this.decodeTokenAndNotify();
  }

  hasToken() {
    return true;
  }

  decodeTokenAndNotify() {
    //const user = //recebe decodificacao do token
    //this.user$.next(user);
  }


}
