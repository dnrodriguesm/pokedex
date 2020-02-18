import { Component, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { Poke, PokeCounter } from '@models/poke.model';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'pkd-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})

export class PokedexComponent {
  private _pokemon: Poke;

  public popular: PokeCounter[];
  public breakpoint: number;

  @Input()
  public set pokemon(poke: Poke) {
    this._pokemon = poke;
    this._addToPopular(poke);
  }

  public get pokemon(): Poke {
    return this._pokemon;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 767) ? 2 : 5;
  }

  constructor(
    private _router: Router,
    private _storageService: StorageService) {
    const items = this._storageService.getItem('popular-pokes');
    this.popular = items ? JSON.parse(items) : [];
    this.breakpoint = 5;
  }

  public goToItem(poke: PokeCounter): void {
    this._router.navigate(['pokedex', poke.name]);
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
