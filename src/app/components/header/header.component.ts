import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSelectChange, MatSelect } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Poke, PokeCommon } from '@models/poke.model';
import { PokeService } from '@services/poke.service';

@Component({
  selector: 'pkd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  public pokemons: PokeCommon[];
  public search: FormControl;
  public pokeSearch: FormControl;
  public filteredPokes: ReplaySubject<PokeCommon[]> = new ReplaySubject<PokeCommon[]>(1);

  protected _onDestroy = new Subject<void>();

  @ViewChild('select') select: MatSelect;

  @Output() changedPokemon: EventEmitter<Poke> = new EventEmitter<Poke>();

  constructor(private _pokeService: PokeService) {
    this.search = new FormControl([null]);
    this.pokeSearch = new FormControl([[]]);
  }

  ngOnInit() {
    this._pokeService.getAll().subscribe(
      pokemons => {
        this.pokemons = pokemons;
        this.pokeSearch.setValue(this.pokemons);
        this.filteredPokes.next(this.pokemons.slice());
      },
      err => console.error(err)
    );

    this.search.valueChanges.pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterPokes());
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private filterPokes() {
    if (!this.pokemons) {
      return;
    }

    let search = this.search.value;

    if (!search) {
      this.filteredPokes.next(this.pokemons.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredPokes.next(
      this.pokemons.filter(poke => poke.name.toLowerCase().indexOf(search) > -1)
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
