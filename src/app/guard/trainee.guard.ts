import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const traineeGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('userinfo');
  const router = inject(Router);
  let userinfo = JSON.parse(user || '{}');
  console.log(userinfo);

  if (userinfo.role !== 'TRAINEE') {
    router.navigate(['/permission-denied']);
    return false;
  }

  return true;
};
