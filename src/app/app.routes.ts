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
    path: "register",
    loadComponent: () => import('./pages/register/register.component')
      .then((c) => c.RegisterComponent)
  },
  {
    path: "rooms/list",
    loadComponent: () => import('./pages/room/list-rooms/list-rooms.component')
      .then((c) => c.ListRoomsComponent)
  },
  {
    path: "rooms/detail/:id",
    loadComponent: () => import('./pages/room/detail-room/detail-room.component')
      .then((c) => c.DetailRoomComponent)
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
