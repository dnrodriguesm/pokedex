import { Component, Input } from '@angular/core';

import { Poke } from '@models/poke.model';

@Component({
  selector: 'pkd-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})

export class PokedexComponent {
  @Input() pokemon: Poke;
}
