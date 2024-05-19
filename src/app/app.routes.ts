import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { NotfoundComponent } from './pages/public/notfound/notfound.component';

export const routes: Routes = [
  {
    path: "home",
    loadComponent: () => import('./pages/public/home/home.component')
      .then((c) => c.HomeComponent)
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: "login",
    loadComponent: () => import('./pages/public/login/login.component')
      .then((c) => c.LoginComponent)
  },
  {
    path: "register",
    loadComponent: () => import('./pages/public/register/register.component')
      .then((c) => c.RegisterComponent)
  },
  {
    path: "rooms/list",
    loadComponent: () => import('./pages/client/room/list-rooms/list-rooms.component')
      .then((c) => c.ListRoomsComponent)
  },
  {
    path: "rooms/detail/:id",
    loadComponent: () => import('./pages/client/room/detail-room/detail-room.component')
      .then((c) => c.DetailRoomComponent)
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
