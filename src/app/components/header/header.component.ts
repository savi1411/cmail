import { Component } from "@angular/core";
import { PageDataService } from '../../services/page-data.service';
import { HeaderDataService } from '../../services/header-data.service';

@Component({
    selector: 'cmail-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.css',
        './header-search.css'
    ]
})
export class HeaderComponent {
    private _isMenuOpen = false

    get isMenuOpen() {
        return this._isMenuOpen
    }

    toggleMenu() {
        this._isMenuOpen = !this._isMenuOpen
    }

    tituloDaPagina = 'CMail'; // Nova propriedade.

    // Injeção de PageDataService.
    constructor(private pageService: PageDataService
        , private headerDataService: HeaderDataService) {
        // Assinando titulo de PageDataService.
        this.pageService
            .titulo
            .subscribe(novoTitulo => this.tituloDaPagina = novoTitulo);
    }

    handleBuscaChanges({ target }) {
        this.headerDataService.atualizarTermoDeFiltro(target.value)
    }

}
