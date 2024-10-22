import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { branchUnitsListActions, branchUnitPageActions } from "./branch-units.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { BranchUnitsApiService } from "../../services/branch-units/branch-units-api.service";

export const getBranchUnitsEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(BranchUnitsApiService);
    return actions$.pipe(
      ofType(branchUnitsListActions.getBranchUnits),
      switchMap(
        () => apiService.getBranchUnits().pipe(
          map((units) => branchUnitsListActions.getBranchUnitsSuccess({ branchUnits: units })),
          catchError((error) => {
            console.log('Error', error);
            return of(branchUnitsListActions.getBranchUnitsFailed({ error }))
          })
        )
      ),
    );
  }, { functional: true }
);

export const getBranchUnitByIdEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(BranchUnitsApiService);
    return actions$.pipe(
      ofType(branchUnitPageActions.getBranchUnitById),
      switchMap(
        ({ id }) => apiService.getBranchUnitById(id).pipe(
          map((unit) => branchUnitPageActions.getBranchUnitByIdSuccess({ branchUnit: unit })),
          catchError((error) => {
            console.log('Error', error);
            return of(branchUnitPageActions.getBranchUnitByIdFailed({ error }))
          })
        )
      ),
    );
  }, { functional: true }
)

export const createBranchUnitEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(BranchUnitsApiService);
    return actions$.pipe(
      ofType(branchUnitPageActions.createBranchUnit),
      switchMap(
        ({ branchUnit, parentOrganizationId }) => apiService.createBranchUnit(branchUnit, parentOrganizationId).pipe(
          map((unit) => branchUnitPageActions.createBranchUnitSuccess({ branchUnit: unit })),
          catchError((error) => {
            console.log('Error', error);
            return of(branchUnitPageActions.createBranchUnitFailed({ error }))
          })
        )
      ),
    );
  }, { functional: true }
)

export const updateBranchUnitEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(BranchUnitsApiService);
    return actions$.pipe(
      ofType(branchUnitPageActions.updateBranchUnit),
      switchMap(
        ({ branchUnit, parentOrganizationId }) => apiService.updateBranchUnit(branchUnit, parentOrganizationId).pipe(
          map((unit) => branchUnitPageActions.updateBranchUnitSuccess({ branchUnit: unit })),
          catchError((error) => {
            console.log('Error', error);
            return of(branchUnitPageActions.updateBranchUnitFailed({ error }))
          })
        )
      ),
    );
  }, { functional: true }
)

export const daleteBranchUnitEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(BranchUnitsApiService);
    return actions$.pipe(
      ofType(branchUnitPageActions.deleteBranchUnit),
      switchMap(
        ({ id }) => apiService.deleteBranchUnit(id).pipe(
          map(() => branchUnitPageActions.deleteBranchUnitSuccess()),
          catchError((error) => {
            console.log('Error', error);
            return of(branchUnitPageActions.deleteBranchUnitFailed({ error }))
          })
        )
      ),
    );
  }, { functional: true }
)
