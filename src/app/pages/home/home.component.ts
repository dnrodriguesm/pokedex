import { Component } from '@angular/core';

import { Poke } from '@models/poke.model';

@Component({
  selector: 'pkd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  private _pokemon: Poke;

  public set pokemon(poke: Poke) {
    this._pokemon = poke;
  }

  public get pokemon(): Poke {
    return this._pokemon;
  }

  public selectPokemon(poke: Poke): void {
    this.pokemon = poke;
  }
}
