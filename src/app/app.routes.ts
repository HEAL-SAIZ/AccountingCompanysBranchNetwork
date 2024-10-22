import { Routes } from '@angular/router';
import { ROLES } from './models/role.model';
import { roleCanActivate, roleCanMatch } from './guards/role.guard';

export const routes: Routes = [
  { path: "", redirectTo: 'auth', pathMatch: 'full' },

  {
    path: "auth",
    loadComponent: () => import('./pages/auth-page/auth-page.component').then(m => m.AuthPageComponent),
    canActivate: [roleCanActivate],
    canMatch: [roleCanMatch],
    data: { roles: [ROLES.UNKNOWN, ROLES.USER, ROLES.ADMIN] }
  },

  {
    path: "organization-list",
    loadComponent: () => import('./pages/organization-list-page/organization-list-page.component').then(m => m.OrganizationListPageComponent),
    canActivate: [roleCanActivate],
    canMatch: [roleCanMatch],
    data: { roles: [ROLES.USER, ROLES.ADMIN] }
  },

  {
    path: "organization-tree",
    loadComponent: () => import('./pages/organization-tree-page/organization-tree-page.component').then(m => m.OrganizationTreePageComponent),
    canActivate: [roleCanActivate],
    canMatch: [roleCanMatch],
    data: { roles: [ROLES.USER, ROLES.ADMIN] }
  },

  {
    path: "parent-organization",
    loadComponent: () => import('./pages/parent-organization-page/parent-organization-page.component').then(m => m.ParentOrganizationPageComponent),
    canActivate: [roleCanActivate],
    canMatch: [roleCanMatch],
    data: { roles: [ROLES.ADMIN] }
  },
  {
    path: "branch-unit",
    loadComponent: () => import('./pages/branch-unit-page/branch-unit-page.component').then(m => m.BranchUnitPageComponent),
    canActivate: [roleCanActivate],
    canMatch: [roleCanMatch],
    data: { roles: [ROLES.ADMIN] }
  },

  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  },

  { path: '**', redirectTo: 'not-found' }
];
