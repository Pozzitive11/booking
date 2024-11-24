import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map((user) => {
      if (user) {
        // Користувач авторизований, дозволяємо доступ
        return true;
      } else {
        // Користувач не авторизований, перенаправляємо на сторінку входу
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
