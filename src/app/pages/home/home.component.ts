import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd, NavigationStart } from '@angular/router';

import { Poke } from '@models/poke.model';
import { PokeService } from '@services/poke.service';

import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'pkd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements AfterViewInit {
  private _pokemon!: Poke | null;

  @ViewChild(HeaderComponent, { static: true }) header!: HeaderComponent;

  public set pokemon(poke: Poke | null) {
    this._pokemon = poke;
  }

  public get pokemon(): Poke | null {
    return this._pokemon;
  }

  constructor(
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _pokeService: PokeService,
    private _activatedRoute: ActivatedRoute) {}

  ngAfterViewInit() {
    const hasChildrenRoute: boolean = this._activatedRoute.snapshot.children.length > 0;

    if (hasChildrenRoute) {
      this._changePoke(this._activatedRoute.snapshot.children[0].params.id);
    }

    this._router.events.subscribe((navigation) => {
      if (navigation instanceof NavigationEnd) {
        const id = navigation.url.split('/')[2];
        this._changePoke(id);
      }
    });

    this._cdr.detectChanges();
  }

  public selectPokemon(poke: Poke | null): void {
    this.pokemon = poke;
  }

  private _changePoke(id: string): void {
    if (!id) { return; }

    const poke_id = this._pokeService.getPokeName(id);
    this.header.search.pokeSearch.setValue(poke_id);

    if (!poke_id) {
      this._router.navigate(['pokedex']);
      return;
    }

    this._pokeService.getPoke(poke_id).subscribe(
      pokemon => {
        const { select } = this.header.search;
        select.value = poke_id;
        this.selectPokemon(pokemon);
      },
      err => console.error(err)
    );
  }
}
