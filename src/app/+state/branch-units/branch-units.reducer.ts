import { createFeature, createReducer, on } from "@ngrx/store";
import { branchUnitsListActions, branchUnitPageActions } from "./branch-units.actions";
import { BRANCH_UNITS_FEATURE_KEY } from "./branch-units.selectors";
import { IBranchUnit } from "../../models/branch-unit.model";

export interface BranchUnitsState {
  currentBranchUnit: IBranchUnit | null,
  branchUnits: IBranchUnit[],
  count: number,
  status: string
};

export const initialBranchUnitsState: BranchUnitsState = {
  currentBranchUnit: null,
  branchUnits: [],
  count: 0,
  status: ''
};

export const branchUnitsFeature = createFeature({
  name: BRANCH_UNITS_FEATURE_KEY,
  reducer: createReducer(
    initialBranchUnitsState,
    on(branchUnitsListActions.getBranchUnits, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(branchUnitsListActions.getBranchUnitsSuccess, (state, { branchUnits }) => ({
      ...state,
      branchUnits: branchUnits,
      status: 'success',
    })),
    on(branchUnitsListActions.getBranchUnitsFailed, (state) => ({
      ...state,
      status: 'error'
    })),

    on(branchUnitPageActions.getBranchUnitById, (state,) => ({
      ...state,
      status: 'loading'
    })),
    on(branchUnitPageActions.getBranchUnitByIdSuccess, (state, { branchUnit }) => ({
      ...state,
      currentBranchUnit: branchUnit,
      status: 'success'
    })),
    on(branchUnitPageActions.getBranchUnitByIdFailed, (state) => ({
      ...state,
      status: 'error'
    })),

    on(branchUnitPageActions.createBranchUnit, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(branchUnitPageActions.createBranchUnitSuccess, (state, { branchUnit }) => ({
      ...state,
      currentBranchUnit: branchUnit,
      status: 'success'
    })),
    on(branchUnitPageActions.createBranchUnitFailed, (state) => ({
      ...state,
      status: 'error'
    })),

    on(branchUnitPageActions.updateBranchUnit, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(branchUnitPageActions.updateBranchUnitSuccess, (state, { branchUnit }) => ({
      ...state,
      currentBranchUnit: branchUnit,
      status: 'success'
    })),
    on(branchUnitPageActions.updateBranchUnitFailed, (state) => ({
      ...state,
      status: 'error'
    })),

    on(branchUnitPageActions.deleteBranchUnit, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(branchUnitPageActions.deleteBranchUnitSuccess, (state) => ({
      ...state,
      currentOrganization: null,
      status: 'success'
    })),
    on(branchUnitPageActions.deleteBranchUnitFailed, (state) => ({
      ...state,
      status: 'error'
    })),
  )
});
