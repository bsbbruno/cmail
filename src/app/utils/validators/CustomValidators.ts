import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpResponseBase, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CustomValidators {

    constructor(private http:HttpClient){}

    imageValidator() {
        return (field: FormControl) => {
            return this.http.head(field.value, {observe: 'response'})
            .pipe(
                map((response: HttpResponseBase) => {
                    return response.ok ? null : { urlInvalida: true }
                }),
                catchError((error) => {
                    return [{ urlInvalida: true }]
                })
            );
        }
    }

    lowerCaseValidator(field: FormControl) {
        const value = field.value;

        if (value.trim() && !/[a-z0-9]+$/.test(value)) {
            return { lowerCase: true };
        }

        return null;
    }

}