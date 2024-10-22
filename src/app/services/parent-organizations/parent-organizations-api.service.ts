import { Injectable } from '@angular/core';
import { IParentOrganization } from '../../models/parent-organization.model';
import { Observable, of, throwError } from 'rxjs';
import { branchUnits } from '../branch-units/branch-units-api.service';
import { IBranchUnit } from '../../models/branch-unit.model';

@Injectable({
  providedIn: 'root'
})
export class ParentOrganizationsApiService {

  public getOrganizations(): Observable<IParentOrganization[]> {
    return of(parentOrganizations);
  }

  public getOrganizationById(id: number): Observable<IParentOrganization> {
    const organization = parentOrganizations.find((org) => org.id === id)
    if (organization) {
      return of(organization);
    }
    return throwError(() => new Error('Организация не найдена'));
  }

  public createOrganization(organization: IParentOrganization): Observable<IParentOrganization> {
    const newOrganization = { ...organization };

    if (parentOrganizations.length) {
      const lastIndex = parentOrganizations.length - 1;
      const lastId = parentOrganizations[lastIndex].id!;
      newOrganization.id = lastId + 1;
    } else {
      newOrganization.id = 1;
    }

    const organizationsCopy = [...parentOrganizations];
    organizationsCopy.push(newOrganization);
    parentOrganizations = organizationsCopy;
    return of(newOrganization);
  }

  public updateOrganization(organization: IParentOrganization): Observable<IParentOrganization> {
    const organizationsCopy = [...parentOrganizations];

    const organizationIndex = organizationsCopy.findIndex((org) => org.id === organization.id);

    if (organizationIndex !== -1) {
      const branchUnits = parentOrganizations[organizationIndex].branchUnits;
      const orgaizationCopy = { ...organization }

      orgaizationCopy.branchUnits = branchUnits;
      organizationsCopy[organizationIndex] = orgaizationCopy;

      parentOrganizations = organizationsCopy;
      return of(organization);
    }
    return throwError(() => new Error('Организация не найдена'));
  }

  public deleteOrganization(id: number): Observable<void> {
    const organization = parentOrganizations.find((org) => org.id === id)
    if (organization) {
      parentOrganizations = parentOrganizations.filter((org) => org.id !== id)
      return of(void 0);
    }
    return throwError(() => new Error('Организация не найдена'));
  }

  public addBranchUnitToOrganization(branchUnit: IBranchUnit, parentOrganizationId: number): void {
    const organizationIndex = parentOrganizations.findIndex((org) => org.id === parentOrganizationId);

    if (organizationIndex === -1) {
      console.error('Нет организаций');
      return;
    }

    const organization = parentOrganizations[organizationIndex];

    const updatedBranchUnits = [...organization.branchUnits || [], branchUnit];

    const updatedOrganization: IParentOrganization = {
      ...organization,
      branchUnits: updatedBranchUnits
    };

    parentOrganizations = [
      ...parentOrganizations.slice(0, organizationIndex),
      updatedOrganization,
      ...parentOrganizations.slice(organizationIndex + 1)
    ];
  }

  public changeBranchUnitToOrganization(branchUnit: IBranchUnit, parentOrganizationId: number): void {
    const organizationIndex = parentOrganizations.findIndex(org => org.id === parentOrganizationId);

    if (organizationIndex === -1) {
      console.error('Нет организаций');
      return;
    }

    const organization = parentOrganizations[organizationIndex];

    const updatedBranchUnits = [...organization.branchUnits || []];
    const branchUnitIndex = updatedBranchUnits.findIndex(unit => unit.id === branchUnit.id);

    if (branchUnitIndex !== -1) {
      updatedBranchUnits[branchUnitIndex] = branchUnit;

      const updatedOrganization: IParentOrganization = {
        ...organization,
        branchUnits: updatedBranchUnits,
      };

      parentOrganizations = [
        ...parentOrganizations.slice(0, organizationIndex),
        updatedOrganization,
        ...parentOrganizations.slice(organizationIndex + 1),
      ];
    } else {
      updatedBranchUnits.push(branchUnit);

      const updatedOrganization: IParentOrganization = {
        ...organization,
        branchUnits: updatedBranchUnits,
      };

      parentOrganizations = [
        ...parentOrganizations.slice(0, organizationIndex),
        updatedOrganization,
        ...parentOrganizations.slice(organizationIndex + 1),
      ];
    }
  }

}

export let parentOrganizations: IParentOrganization[] = [
  {
    id: 1,
    name: 'Kentucky Fried Chicken',
    shortName: 'KFC',
    inn: '1111111111',
    kpp: '111111111',
    founder: 'Харланд Дэвид Сандерс',
    address: 'г. Москва, р-н Черемушки, Научный проезд, д. 17, помещ. XIII, ком. 8, 8',
    phone: '+7 999 999 9999',
    branchUnits: [branchUnits[0], branchUnits[1]],
  },
]

