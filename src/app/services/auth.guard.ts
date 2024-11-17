import { CanActivateFn } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { inject } from '@angular/core';
import { AuthService } from './auth.service'; // Importa tu servicio de autenticación
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = getAuth();
  const authService = inject(AuthService);
  const router = inject(Router);

  return new Promise<boolean>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user && authService.isSessionValid()) {
        resolve(true); // Usuario autenticado y sesión válida
      } else {
        authService.logout().then(() => {
          router.navigate(['/login']); // Redirige al login si no está autenticado o la sesión caducó
        });
        resolve(false); // Bloquea la navegación
      }
    });
  });
};
