import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { NotfoundComponent } from './pages/public/notfound/notfound.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';

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
      .then((c) => c.LoginComponent),
    canActivate: [publicGuard]
  },
  {
    path: "register",
    loadComponent: () => import('./pages/public/register/register.component')
      .then((c) => c.RegisterComponent),
    canActivate: [publicGuard]
  },
  {
    path: "rooms/list",
    loadComponent: () => import('./pages/client/room/list-rooms/list-rooms.component')
      .then((c) => c.ListRoomsComponent),
    canActivate: [authGuard]
  },
  {
    path: "rooms/detail/:id",
    loadComponent: () => import('./pages/client/room/detail-room/detail-room.component')
      .then((c) => c.DetailRoomComponent),
    canActivate: [authGuard]
  },
  {
    path: "reservations/list",
    loadComponent: () => import('./pages/client/reservation/list-reservations/list-reservations.component')
      .then((c) => c.ListReservationsComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
