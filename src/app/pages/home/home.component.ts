import { Component, ViewChild } from '@angular/core';

import { Poke, PokeCommon } from '@models/poke.model';
import { environment } from '@env/environment';

import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'pkd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  private _pokemon: Poke;

  @ViewChild(HeaderComponent) header: HeaderComponent;

  public set pokemon(poke: Poke) {
    this._pokemon = poke;
  }

  public get pokemon(): Poke {
    return this._pokemon;
  }

  public selectPokemon(poke: Poke): void {
    this.pokemon = poke;
  }

  public changePokemon(value: PokeCommon) {
    const { select } = this.header.search;
    select.value = `${environment.pokeApi}/${value.url}/`;
    select.selectionChange.emit({ source: select, value: select.value });
  }
}
