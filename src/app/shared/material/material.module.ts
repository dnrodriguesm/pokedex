import { NgModule } from '@angular/core';

import {
  MatSelectModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatButtonModule,
  MatGridListModule } from '@angular/material';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const MODULES = [
  MatSelectModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatButtonModule,
  MatGridListModule,
  NgxMatSelectSearchModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})

export class MaterialModule {}
