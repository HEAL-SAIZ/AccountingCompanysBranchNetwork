import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as OrganizationsSelectors from '../../+state/parent-organizations/parent-organizations.selectors';
import { organizationPageActions, organizationsListActions } from '../../+state/parent-organizations/parent-organizations.actions';
import { IParentOrganization } from '../../models/parent-organization.model';

@Injectable({
  providedIn: 'root'
})
export class ParentOrganizationsStateService {

  private readonly store = inject(Store);

  public readonly organizations$ = this.store.select(OrganizationsSelectors.selectOrganizations);
  public readonly currentOrganization$ = this.store.select(OrganizationsSelectors.selectCurrentOrganization);
  public readonly count$ = this.store.select(OrganizationsSelectors.selectOrganizationsCount);
  public readonly status$ = this.store.select(OrganizationsSelectors.selectOrganizationsStatus);

  public getOrganizations(): void {
    this.store.dispatch(organizationsListActions.getOrganizations())
  }

  public getOrganizationById(id: number): void {
    this.store.dispatch(organizationPageActions.getOrganizationById({ id }))
  }

  public createOrganization(organization: IParentOrganization): void {
    this.store.dispatch(organizationPageActions.createOrganization({ organization }))
  }

  public updateOrganization(organization: IParentOrganization): void {
    this.store.dispatch(organizationPageActions.updateOrganization({ organization }))
  }

  public deleteOrganization(id: number): void {
    this.store.dispatch(organizationPageActions.deleteOrganization({ id }))
  }
}
