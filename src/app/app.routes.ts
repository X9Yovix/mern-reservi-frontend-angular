import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
  {
    path: "home",
    loadComponent: () => import('./pages/home/home.component')
      .then((c) => c.HomeComponent)
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: "login",
    loadComponent: () => import('./pages/login/login.component')
      .then((c) => c.LoginComponent)
  },
  {
    path: "rooms/list",
    loadComponent: () => import('./pages/list-rooms/list-rooms.component')
      .then((c) => c.ListRoomsComponent)
  },
  {
    path: "register",
    loadComponent: () => import('./pages/register/register.component')
      .then((c) => c.RegisterComponent)
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
