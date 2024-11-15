import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ViewPokemonComponent } from './pages/view-pokemon/view-pokemon.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path:'tuPokemon/:id',
    component: ViewPokemonComponent
  }
];
