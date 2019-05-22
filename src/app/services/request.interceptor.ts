import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (localStorage.getItem('TOKEN')) {
            req = req.clone({
                setHeaders: {
                    'Authorization': localStorage.getItem('TOKEN')
                }
            });
        }

        return next.handle(req);
    }

}