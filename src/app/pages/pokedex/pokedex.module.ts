import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PokedexComponent } from './pokedex.component';
import { PokedexRoutingModule } from './pokedex.routing.module';

@NgModule({
  declarations: [PokedexComponent],
  imports: [
    CommonModule,
    PokedexRoutingModule
  ],
  exports: [RouterModule]
})

export class PokedexModule {}
