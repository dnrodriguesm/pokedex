import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    redirectTo: '/pokedex',
    pathMatch: 'full'
  },
  {
    path: 'pokedex',
    component: HomeComponent,
    children: [{
      path: ':id',
      component: HomeComponent,
    }]
  },
  {
    path: '**',
    redirectTo: '/pokedex',
    pathMatch: 'full'
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class HomeRoutingModule {}
