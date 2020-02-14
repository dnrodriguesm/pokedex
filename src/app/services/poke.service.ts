import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

import { Poke, PokeCommon } from '@models/poke.model';

import { StorageService } from '@services/storage.service';

@Injectable({ providedIn: 'root' })

export class PokeService {
  public get keyOfStorage(): string {
    return 'pokemons';
  }

  constructor(
    private _http: HttpClient,
    private _storage: StorageService) {}

  private _hasPokesInCache(): boolean {
    const item: string = this._storage.getItem(this.keyOfStorage);
    return !!item;
  }

  private _hasPokeInCache(id: string): Poke {
    if (this._hasPokesInCache()) {
      const pokemons: PokeCommon[] = JSON.parse(this._storage.getItem(this.keyOfStorage));
      return pokemons[parseInt(id, 10) - 1].cache || null;
    }

    return null;
  }

  private _setPokeInCache(poke: Poke): void {
    if (this._hasPokesInCache()) {
      const pokemons: PokeCommon[] = JSON.parse(this._storage.getItem(this.keyOfStorage));
      const index: number = pokemons.findIndex(item => item.name === poke.name);
      this._updateCache(pokemons, poke, index);
    }
  }

  private _updateCache(pokemons: PokeCommon[], poke: Poke, index: number): void {
    pokemons[index].cache = poke;
    this._storage.setItem(this.keyOfStorage, JSON.stringify(pokemons));
  }

  public getPoke(id: string = 'pikachu'): Observable<Poke> {
    return new Observable(observer => {
      if (this._hasPokeInCache(id)) {
        observer.next(this._hasPokeInCache(id));
        observer.complete();
        return;
      }

      this._http.get(`${environment.pokeApi}/${id}`)
        .subscribe(
          (pokemon: Poke) => {
            this._setPokeInCache(pokemon);
            observer.next(pokemon);
          },
          err => observer.error(err),
          () => observer.complete
        );
    });
  }

  public getAll(): Observable<PokeCommon[]> {
    return new Observable(observer => {
      if (this._hasPokesInCache()) {
        observer.next(JSON.parse(this._storage.getItem(this.keyOfStorage)));
        observer.complete();
        return;
      }

      this._http.get(`${environment.pokeApi}/?limit=1000`)
        .subscribe(
          (response: any) => {
            const { results } = response;

            this._storage.setItem(this.keyOfStorage, JSON.stringify(results));
            observer.next(results as PokeCommon[]);
          },
          err => observer.error(err),
          () => observer.complete()
        );
    });
  }

  public getPokeId(url: string): string {
    return url.replace(environment.pokeApi, '').replace('/', '');
  }
}
