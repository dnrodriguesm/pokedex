import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

import { Poke, PokeCommon } from '@models/poke.model';

import { StorageService } from '@services/storage.service';

@Injectable({ providedIn: 'root' })

export class PokeService {
  public pokemons: PokeCommon[] = [];

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
      const item = this.pokemons.find(poke => poke.url === `${environment.pokeApi}/${id}/`);
      return item.cache || null;
    }

    return null;
  }

  private _setPokeInCache(poke: Poke): void {
    if (this._hasPokesInCache()) {
      const index: number = this.pokemons.findIndex(item => item.name === poke.name);
      this._updateCache(poke, index);
    }
  }

  private _updateCache(poke: Poke, index: number): void {
    this.pokemons[index].cache = poke;
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
        this.pokemons = JSON.parse(this._storage.getItem(this.keyOfStorage));
        observer.next(this.pokemons);
        observer.complete();
        return;
      }

      this._http.get(`${environment.pokeApi}/?limit=1000`)
        .subscribe(
          (response: any) => {
            const { results } = response;

            this._storage.setItem(this.keyOfStorage, JSON.stringify(results));
            this.pokemons = results;
            observer.next(results as PokeCommon[]);
          },
          err => observer.error(err),
          () => observer.complete()
        );
    });
  }

  public getPokeId(url: string): string {
    return url.replace(environment.pokeApi, '').replace(new RegExp('/', 'g'), '');
  }
}
