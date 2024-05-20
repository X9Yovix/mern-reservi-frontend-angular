import { CanActivateFn } from '@angular/router';

export const publicGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("token")
  if (token === null) {
    return true
  } else {
    return false
  }
}
