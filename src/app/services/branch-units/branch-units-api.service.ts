import { Injectable } from '@angular/core';
import { IBranchUnit } from '../../models/branch-unit.model';
import { Observable, of, throwError } from 'rxjs';
import { ParentOrganizationsApiService } from '../parent-organizations/parent-organizations-api.service';

@Injectable({
  providedIn: 'root'
})
export class BranchUnitsApiService {

  constructor(
    private organizationsApiService: ParentOrganizationsApiService
  ) { }

  public getBranchUnits(): Observable<IBranchUnit[]> {
    return of(branchUnits);
  }

  public getBranchUnitById(id: number): Observable<IBranchUnit> {
    const branchUnit = branchUnits.find((unit) => unit.id === id)
    if (branchUnit) {
      return of(branchUnit);
    }
    return throwError(() => new Error('Организация не найдена'));
  }

  public createBranchUnit(branchUnit: IBranchUnit, parentOrganizationId: number): Observable<IBranchUnit> {
    const newBranchUnit = { ...branchUnit };

    if (branchUnits.length) {
      const lastIndex = branchUnits.length - 1;
      const lastId = branchUnits[lastIndex].id!;
      newBranchUnit.id = lastId + 1;
    } else {
      newBranchUnit.id = 1;
    }

    const branchUnitsCopy = [...branchUnits];
    branchUnitsCopy.push(newBranchUnit);
    branchUnits = branchUnitsCopy;

    this.organizationsApiService.addBranchUnitToOrganization(branchUnit, parentOrganizationId);
    return of(newBranchUnit);
  }

  public updateBranchUnit(branchUnit: IBranchUnit, parentOrganizationId: number): Observable<IBranchUnit> {
    const branchUnitsCopy = [...branchUnits];

    const branchUnitIndex = branchUnitsCopy.findIndex((org) => org.id === branchUnit.id);

    if (branchUnitIndex !== -1) {
      const orgaizationCopy = { ...branchUnit }
      branchUnitsCopy[branchUnitIndex] = orgaizationCopy;

      branchUnits = branchUnitsCopy;
      this.organizationsApiService.changeBranchUnitToOrganization(branchUnit, parentOrganizationId);
      return of(branchUnit);
    }
    return throwError(() => new Error('Организация не найдена'));
  }

  public deleteBranchUnit(id: number): Observable<void> {
    const branchUnit = branchUnits.find((org) => org.id === id)
    if (branchUnit) {
      branchUnits = branchUnits.filter((org) => org.id !== id)
      return of(void 0);
    }
    return throwError(() => new Error('Организация не найдена'));
  }
}

export let branchUnits: IBranchUnit[] = [
  {
    id: 1,
    address: 'Первый филиал KFC',
    phone: '+7 999 762 5623',
    official: 'Представитель первого филиала'
  },
  {
    id: 2,
    address: 'Второй филиал KFC',
    phone: '+7 999 426 8526',
    official: 'Представитель второго филиала'
  }
]
