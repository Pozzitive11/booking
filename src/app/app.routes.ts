import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main-page/main-page.component').then(
        (m) => m.MainPageComponent
      ),

    pathMatch: 'full',
  },
  {
    path: 'book-room/:roomId',
    loadComponent: () =>
      import('./pages/book-room-page/book-room-page.component').then(
        (m) => m.BookRoomPageComponent
      ),
  },
];
