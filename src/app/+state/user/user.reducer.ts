import { createFeature, createReducer, on } from "@ngrx/store";
import { ROLES } from "../../models/role.model";
import { logoutUser, userActions } from "./user.actions";
import { USER_FEATURE_KEY } from "./user.selectors";

export interface UserState {
  username: string,
  role: string,
  status: string
};

export const initialUserState: UserState = {
  username: '',
  role: ROLES.UNKNOWN,
  status: '',
};

export const userFeature = createFeature({
  name: USER_FEATURE_KEY,
  reducer: createReducer(
    initialUserState,
    on(userActions.loginUser, (state) => ({
      ...state,
      status: 'login'
    })),
    on(userActions.loginUserSuccess, (state, { username, role }) => ({
      ...state,
      username: username,
      role: role,
      status: 'success',
    })),
    on(userActions.loginUserFailed, (state) => ({
      ...state,
      status: 'error'
    })),
    on(logoutUser, (state) => ({
      ...state,
      username: '',
      role: ROLES.UNKNOWN,
      status: '',
    }))
  )
});
