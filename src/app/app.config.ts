import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userFeature } from './+state/user/user.reducer';
import * as userEffects from './+state/user/user.effects';
import { organizationsFeature } from './+state/parent-organizations/parent-organizations.reducer';
import * as OrganizationsEffects from './+state/parent-organizations/parent-organizations.effects';
import { branchUnitsFeature } from './+state/branch-units/branch-units.reducer';
import * as BranchUnitsEffects from './+state/branch-units/branch-units.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),

    provideStore({
      [userFeature.name]: userFeature.reducer,
      [organizationsFeature.name]: organizationsFeature.reducer,
      [branchUnitsFeature.name]: branchUnitsFeature.reducer,
    }),

    provideEffects(
      userEffects,
      OrganizationsEffects,
      BranchUnitsEffects
    ),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    })]
};
