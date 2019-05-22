import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderDataService {

  valorDoFiltro = new EventEmitter<string>();

  constructor() { 
    this.atualizarTermoFiltro('');
  }

  atualizarTermoFiltro(novoValor: string) {
    this.valorDoFiltro.emit(novoValor);
  }
}
