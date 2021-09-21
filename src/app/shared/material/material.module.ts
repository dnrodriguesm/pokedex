import { NgModule } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';

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
