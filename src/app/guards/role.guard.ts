import { CanMatchFn, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserStateService } from '../services/user/user-state.service';
import { ROLES } from '../models/role.model';

export const roleCanMatch: CanMatchFn = (route, _segments) => {
  const userStateService = inject(UserStateService);
  const router = inject(Router);

  const requiredRoles: ROLES = route.data!['roles'];

  return userStateService.role$.pipe(
    map(userRole => {
      if (requiredRoles.includes(userRole)) {
        return true;
      }
      router.navigate(['/auth']);
      return false;
    })
  );
};

export const roleCanActivate: CanActivateFn = (route, _state) => {
  const userStateService = inject(UserStateService);
  const router = inject(Router);

  const requiredRoles: ROLES = route.data['roles'];

  return userStateService.role$.pipe(
    map(userRole => {
      if (requiredRoles.includes(userRole)) {
        return true;
      }
      router.navigate(['/auth']);
      return false;

    })
  );
};
