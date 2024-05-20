import { CanActivateFn, Router } from '@angular/router';
import isTokenValid from '../utils/valid-token';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("token")
  const isValid = isTokenValid.isValid(token)

  if (isValid) {
    return true
  } else {
    const router = inject(Router)
    router.navigate(['/login'])
    return false
  }
}
