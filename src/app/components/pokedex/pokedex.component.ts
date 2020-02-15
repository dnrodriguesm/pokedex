import { Component, Input } from '@angular/core';

import { Poke, PokeCommon } from '@models/poke.model';

@Component({
  selector: 'pkd-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})

export class PokedexComponent {
  private _pokemon: Poke;

  public popular: Poke[] = [];

  @Input() pokemons: PokeCommon[];

  @Input()
  public set pokemon(poke: Poke) {
    this._pokemon = poke;
    this._addToPopular(poke);
  }

  public get pokemon(): Poke {
    return this._pokemon;
  }

  private _addToPopular(poke: Poke) {
    if (!poke) { return; }

    if (this.popular.find(pokemon => pokemon.name === poke.name)) {
      const index = this.popular.findIndex(pokemon => pokemon.name === poke.name);
      this.popular[index].times++;
    } else {
      this.popular.push({ ...poke, times: 1 });
    }

    this.popular = this.popular.sort((a, b) => {
      if (a.times > b.times) { return 1; }
      if (b.times > a.times) { return -1; }

      return 0;
    }).slice(0).reverse();
  }
}
