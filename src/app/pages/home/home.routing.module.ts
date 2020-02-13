import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{
      path: '',
      redirectTo: '/pokedex',
      pathMatch: 'full'
    },
    {
      path: 'pokedex',
      loadChildren: '@pages/pokedex/pokedex.module#PokedexModule'
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
