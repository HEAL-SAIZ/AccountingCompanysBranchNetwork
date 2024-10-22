import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { organizationsListActions, organizationPageActions } from "./parent-organizations.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { ParentOrganizationsApiService } from "../../services/parent-organizations/parent-organizations-api.service";

export const getOrganizationsEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ParentOrganizationsApiService);
    return actions$.pipe(
      ofType(organizationsListActions.getOrganizations),
      switchMap(
        () => apiService.getOrganizations().pipe(
          map((orgs) => organizationsListActions.getOrganizationsSuccess({ orgaizations: orgs })),
          catchError((error) => {
            console.log('Error', error);
            return of(organizationsListActions.getOrganizationsFailed({ error }))
          })
        )
      ),
    );
  }, { functional: true }
);

export const getOrganizationByIdEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ParentOrganizationsApiService);
    return actions$.pipe(
      ofType(organizationPageActions.getOrganizationById),
      switchMap(
        ({ id }) => apiService.getOrganizationById(id).pipe(
          map((org) => organizationPageActions.getOrganizationByIdSuccess({ organization: org })),
          catchError((error) => {
            console.log('Error', error);
            return of(organizationPageActions.getOrganizationByIdFailed({ error }))
          })
        )
      ),
    );
  }, { functional: true }
)

export const createOrganizationEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ParentOrganizationsApiService);
    return actions$.pipe(
      ofType(organizationPageActions.createOrganization),
      switchMap(
        ({ organization }) => apiService.createOrganization(organization).pipe(
          map((org) => organizationPageActions.createOrganizationSuccess({ organization: org })),
          catchError((error) => {
            console.log('Error', error);
            return of(organizationPageActions.createOrganizationFailed({ error }))
          })
        )
      ),
    );
  }, { functional: true }
)

export const updateOrganizationEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ParentOrganizationsApiService);
    return actions$.pipe(
      ofType(organizationPageActions.updateOrganization),
      switchMap(
        ({ organization }) => apiService.updateOrganization(organization).pipe(
          map((org) => organizationPageActions.updateOrganizationSuccess({ organization: org })),
          catchError((error) => {
            console.log('Error', error);
            return of(organizationPageActions.updateOrganizationFailed({ error }))
          })
        )
      ),
    );
  }, { functional: true }
)

export const daleteOrganizationEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ParentOrganizationsApiService);
    return actions$.pipe(
      ofType(organizationPageActions.deleteOrganization),
      switchMap(
        ({ id }) => apiService.deleteOrganization(id).pipe(
          map(() => organizationPageActions.deleteOrganizationSuccess()),
          catchError((error) => {
            console.log('Error', error);
            return of(organizationPageActions.deleteOrganizationFailed({ error }))
          })
        )
      ),
    );
  }, { functional: true }
)
