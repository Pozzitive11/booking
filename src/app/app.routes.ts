import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main-page/main-page.component').then(
        (m) => m.MainPageComponent
      ),

    pathMatch: 'full',
    canActivate: [authGuard],
  },
  {
    path: 'book-room/:roomId',
    loadComponent: () =>
      import('./pages/book-room-page/book-room-page.component').then(
        (m) => m.BookRoomPageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'user-booking',
    loadComponent: () =>
      import('./pages/user-booking-page/user-booking-page.component').then(
        (m) => m.UserBookingPageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-page/register-page.component').then(
        (m) => m.RegisterPageComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
];
