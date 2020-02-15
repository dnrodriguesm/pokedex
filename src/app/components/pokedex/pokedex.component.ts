import { Component, Input } from '@angular/core';

import { Poke, PokeCommon, PokeCounter } from '@models/poke.model';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'pkd-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})

export class PokedexComponent {
  private _pokemon: Poke;

  public popular: PokeCounter[];

  @Input() pokemons: PokeCommon[];

  @Input()
  public set pokemon(poke: Poke) {
    this._pokemon = poke;
    this._addToPopular(poke);
  }

  public get pokemon(): Poke {
    return this._pokemon;
  }

  constructor(private _storageService: StorageService) {
    const items = this._storageService.getItem('popular-pokes');
    this.popular = items ? JSON.parse(items) : [];
  }

  private _addToPopular(poke: Poke) {
    if (!poke) { return; }

    if (this.popular.find(pokemon => pokemon.name === poke.name)) {
      const index = this.popular.findIndex(pokemon => pokemon.name === poke.name);
      this.popular[index].times++;
    } else {
      this.popular.push({ name: poke.name, thumb: poke.sprites.front_default, times: 1 });
    }

    this.popular = this.popular.sort((a, b) => {
      if (a.times > b.times) { return 1; }
      if (b.times > a.times) { return -1; }

      return 0;
    }).slice(0).reverse();

    this._storageService.setItem('popular-pokes', JSON.stringify(this.popular));
  }
}
