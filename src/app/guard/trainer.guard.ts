import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const trainerGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('userinfo');
  const router = inject(Router);
  let userinfo = JSON.parse(user || '{}');

  if (userinfo.role !== 'TRAINER') {
    router.navigate(['/permission-denied']);
    return false;
  }

  return true;
};
