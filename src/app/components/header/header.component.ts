import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Poke } from '@models/poke.model';
import { SearchComponent } from '@components/search/search.component';

@Component({
  selector: 'pkd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @ViewChild('search', { static: true }) search!: SearchComponent;

  @Output() changedPokemon: EventEmitter<Poke | null> = new EventEmitter<Poke | null>();

  constructor(private _router: Router) {}

  public clearChange(search: SearchComponent): void {
    this._router.navigate(['pokedex']);

    search.select.value = null;
    search.pokeSearch.setValue(null);
    this.emitPokemon();
  }

  public emitPokemon(poke?: Poke) {
    this.changedPokemon.emit(poke || null);
  }
}
