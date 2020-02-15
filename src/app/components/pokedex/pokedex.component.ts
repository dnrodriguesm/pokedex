import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  @Input()
  public set pokemon(poke: Poke) {
    this._pokemon = poke;
    this._addToPopular(poke);
  }

  public get pokemon(): Poke {
    return this._pokemon;
  }

  @Output() changedPokemon: EventEmitter<PokeCommon> = new EventEmitter<PokeCommon>();

  constructor(private _storageService: StorageService) {
    const items = this._storageService.getItem('popular-pokes');
    this.popular = items ? JSON.parse(items) : [];
  }

  public goToItem(poke: PokeCounter): void {
    const { name, url } = poke;
    this.changedPokemon.emit({ name, url });
  }

  private _addToPopular(poke: Poke) {
    if (!poke) { return; }

    const { name, id, sprites } = poke;
    const { front_default: thumb } = sprites;

    if (this.popular.find(pokemon => pokemon.name === poke.name)) {
      const index = this.popular.findIndex(pokemon => pokemon.name === poke.name);
      this.popular[index].times++;
    } else {
      this.popular.push({
        name,
        thumb,
        times: 1,
        url: id.toString()
      });
    }

    this.popular = this.popular.sort((a, b) => {
      if (a.times > b.times) { return 1; }
      if (b.times > a.times) { return -1; }

      return 0;
    }).slice(0).reverse();

    this._storageService.setItem('popular-pokes', JSON.stringify(this.popular));
  }
}
