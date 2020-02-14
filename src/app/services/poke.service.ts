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

  public getPoke(poke: string = 'pikachu'): Observable<Poke> {
    return new Observable(observer => {
      this._http.get(`${environment.pokeApi}/${poke}`)
        .subscribe(
          pokemon => observer.next(pokemon as Poke),
          err => observer.error(err),
          () => observer.complete
        );
    });
  }

  public getAll(): Observable<PokeCommon[]> {
    return new Observable(observer => {
      const item: string = this._storage.getItem(this.keyOfStorage);
      const hasCache: boolean = !!item;

      if (hasCache) {
        observer.next(JSON.parse(item));
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
}
