import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSelectChange, MatSelect } from '@angular/material';

import { Poke, PokeCommon } from '@models/poke.model';
import { PokeService } from '@services/poke.service';

@Component({
  selector: 'pkd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public pokemons: PokeCommon[];

  @Output() changedPokemon: EventEmitter<Poke> = new EventEmitter<Poke>();

  constructor(private _pokeService: PokeService) {}

  ngOnInit() {
    this._pokeService.getAll().subscribe(
      pokemons => this.pokemons = pokemons,
      err => console.error(err)
    );
  }

  public onChange(event: MatSelectChange): void {
    const id: string = this._pokeService.getPokeId(event.value);
    this._pokeService.getPoke(id).subscribe(
      pokemon => this.changedPokemon.emit(pokemon),
      err => console.error(err)
    );
  }

  public clearChange(select: MatSelect): void {
    select.value = null;
    this.changedPokemon.emit(null);
  }
}
