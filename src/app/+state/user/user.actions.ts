import { createAction, createActionGroup, props } from '@ngrx/store';

export const userActions = createActionGroup({
  source: 'Auth Page',
  events: {
    loginUser: props<{ username: string; password: string }>(),
    loginUserSuccess: props<{ username: string, role: string }>(),
    loginUserFailed: props<{ error: any }>(),
  }
});

export const logoutUser = createAction('[Navbar logout]')
