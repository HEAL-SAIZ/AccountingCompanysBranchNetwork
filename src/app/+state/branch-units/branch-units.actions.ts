import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IBranchUnit } from '../../models/branch-unit.model';

export const branchUnitsListActions = createActionGroup({
  source: 'Organization List/Tree Page',
  events: {
    getBranchUnits: emptyProps(),
    getBranchUnitsSuccess: props<{ branchUnits: IBranchUnit[] }>(),
    getBranchUnitsFailed: props<{ error: any }>(),
  }
});

export const branchUnitPageActions = createActionGroup({
  source: 'Branch Unit Page',
  events: {
    getBranchUnitById: props<{ id: number }>(),
    getBranchUnitByIdSuccess: props<{ branchUnit: IBranchUnit }>(),
    getBranchUnitByIdFailed: props<{ error: any }>(),

    createBranchUnit: props<{ branchUnit: IBranchUnit, parentOrganizationId: number }>(),
    createBranchUnitSuccess: props<{ branchUnit: IBranchUnit }>(),
    createBranchUnitFailed: props<{ error: any }>(),

    updateBranchUnit: props<{ branchUnit: IBranchUnit, parentOrganizationId: number }>(),
    updateBranchUnitSuccess: props<{ branchUnit: IBranchUnit }>(),
    updateBranchUnitFailed: props<{ error: any }>(),

    deleteBranchUnit: props<{ id: number }>(),
    deleteBranchUnitSuccess: emptyProps(),
    deleteBranchUnitFailed: props<{ error: any }>(),
  }
});
