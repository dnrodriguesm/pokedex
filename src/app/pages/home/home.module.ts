import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';

import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { PokedexComponent } from '@components/pokedex/pokedex.component';

import {
  MatSelectModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatButtonModule,
  MatGridTile,
  MatGridList } from '@angular/material';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PokedexComponent,
    HomeComponent,
    MatGridTile,
    MatGridList
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatButtonModule,
    NgxMatSelectSearchModule
  ],
  exports: [RouterModule]
})

export class HomeModule {}
