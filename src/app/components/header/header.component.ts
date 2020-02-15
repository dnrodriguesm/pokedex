import { Component, Output, EventEmitter, ViewChild } from '@angular/core';

import { Poke } from '@models/poke.model';
import { SearchComponent } from '@components/search/search.component';

@Component({
  selector: 'pkd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @ViewChild('search') search: SearchComponent;

  @Output() changedPokemon: EventEmitter<Poke> = new EventEmitter<Poke>();

  public clearChange(search: SearchComponent): void {
    search.select.value = null;
    search.pokeSearch.setValue(null);
    this.emitPokemon();
  }

  public emitPokemon(poke?: Poke) {
    this.changedPokemon.emit(poke || null);
  }
}
