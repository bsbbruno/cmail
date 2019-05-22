import { Component, OnInit } from '@angular/core';
import { PageDataService } from 'src/app/services/page-data.service';
import { HeaderDataService } from 'src/app/services/header-data.service';

@Component({
  selector: 'cmail-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './header-search.css']
})
export class HeaderComponent implements OnInit {

  private _isMenuOpen = false;
  tituloDaPagina = 'CMail';

  constructor(private pageService: PageDataService, private headerService: HeaderDataService) {
    this.pageService
      .titulo
      .subscribe(novoTitulo => this.tituloDaPagina = novoTitulo);
  }

  ngOnInit() {
  }

  get isMenuOpen() {
    return this._isMenuOpen;
  }

  toggleMenu() {
    this._isMenuOpen = !this._isMenuOpen;
  }

  handleBuscaChanges({target}) {
    this.headerService.atualizarTermoFiltro(target.value);
  }

}
