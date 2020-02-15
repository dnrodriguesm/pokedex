import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';

import { SearchModule } from '@components/search/search.module';
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { PokedexComponent } from '@components/pokedex/pokedex.component';

import { MatGridTile, MatGridList } from '@angular/material';

import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PokedexComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    SearchModule,
    MaterialModule
  ],
  exports: [RouterModule]
})

export class HomeModule {}
