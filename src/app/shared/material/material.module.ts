import { NgModule } from '@angular/core';

import {
  MatSelectModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatButtonModule } from '@angular/material';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const MODULES = [
  MatSelectModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatButtonModule,
  NgxMatSelectSearchModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})

export class MaterialModule {}
