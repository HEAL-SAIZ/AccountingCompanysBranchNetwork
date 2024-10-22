import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as BranchUnitsSelectors from '../../+state/branch-units/branch-units.selectors';
import { branchUnitPageActions, branchUnitsListActions } from '../../+state/branch-units/branch-units.actions';
import { IBranchUnit } from '../../models/branch-unit.model';

@Injectable({
  providedIn: 'root'
})
export class BranchUnitsStateService {

  private readonly store = inject(Store);

  public readonly branchUnits$ = this.store.select(BranchUnitsSelectors.selectBranchUnits);
  public readonly currentbranchUnit$ = this.store.select(BranchUnitsSelectors.selectCurrentBranchUnit);
  public readonly count$ = this.store.select(BranchUnitsSelectors.selectBranchUnitsCount);
  public readonly status$ = this.store.select(BranchUnitsSelectors.selectBranchUnitsStatus);

  public getBranchUnits(): void {
    this.store.dispatch(branchUnitsListActions.getBranchUnits());
  }

  public getBranchUnitById(id: number): void {
    this.store.dispatch(branchUnitPageActions.getBranchUnitById({ id }));
  }

  public createBranchUnit(branchUnit: IBranchUnit, parentOrganizationId: number): void {
    this.store.dispatch(branchUnitPageActions.createBranchUnit({ branchUnit, parentOrganizationId }));
  }

  public updateBranchUnit(branchUnit: IBranchUnit, parentOrganizationId: number): void {
    this.store.dispatch(branchUnitPageActions.updateBranchUnit({ branchUnit, parentOrganizationId }));
  }

  public deleteBranchUnit(id: number): void {
    this.store.dispatch(branchUnitPageActions.deleteBranchUnit({ id }));
  }
}
