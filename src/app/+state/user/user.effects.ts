import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthApiService } from "../../services/auth-api.service";
import { userActions } from "./user.actions";
import { catchError, map, of, switchMap } from "rxjs";

export const userEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(AuthApiService);
    return actions$.pipe(
      ofType(userActions.loginUser),
      switchMap(
        ({ username, password }) => apiService.login({ username, password }).pipe(
          map((user) => userActions.loginUserSuccess({ username: user.username, role: user.role })),
          catchError((error) => {
            console.log('Error', error);
            return of(userActions.loginUserFailed({ error }))
          })
        )
      ),
    );
  }, { functional: true }
);
