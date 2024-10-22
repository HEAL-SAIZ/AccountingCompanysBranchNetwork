import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BranchUnitsState } from "./branch-units.reducer";

export const BRANCH_UNITS_FEATURE_KEY = 'branch-units';

export const selectBranchUnitsState = createFeatureSelector<BranchUnitsState>(BRANCH_UNITS_FEATURE_KEY);

export const selectBranchUnits = createSelector(
  selectBranchUnitsState,
  (state) => state.branchUnits
);

export const selectCurrentBranchUnit = createSelector(
  selectBranchUnitsState,
  (state) => state.currentBranchUnit
);

export const selectBranchUnitsCount = createSelector(
  selectBranchUnitsState,
  (state) => state.count
);

export const selectBranchUnitsStatus = createSelector(
  selectBranchUnitsState,
  (state) => state.status
);
