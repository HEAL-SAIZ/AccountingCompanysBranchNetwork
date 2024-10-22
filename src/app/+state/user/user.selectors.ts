import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const USER_FEATURE_KEY = 'user';

export const selectUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const selectUser = createSelector(
  selectUserState,
  (state) => state
);

export const selectUserRole = createSelector(
  selectUserState,
  (state) => state.role
);

export const selectUserStatus = createSelector(
  selectUserState,
  (state) => state.status
);

export const selectUserUsername = createSelector(
  selectUserState,
  (state) => state.username
);
