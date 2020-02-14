import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';

import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { PokedexComponent } from '@components/pokedex/pokedex.component';

import { MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PokedexComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSelectModule,

  ],
  exports: [RouterModule]
})

export class HomeModule {}
