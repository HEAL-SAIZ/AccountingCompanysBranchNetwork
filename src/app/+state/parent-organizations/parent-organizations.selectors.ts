import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrganizationsState } from "./parent-organizations.reducer";

export const ORGANIZATIONS_FEATURE_KEY = 'organizations';

export const selectOrganizationsState = createFeatureSelector<OrganizationsState>(ORGANIZATIONS_FEATURE_KEY);

export const selectOrganizations = createSelector(
  selectOrganizationsState,
  (state) => state.organizations
);

export const selectCurrentOrganization = createSelector(
  selectOrganizationsState,
  (state) => state.currentOrganization
);

export const selectOrganizationsCount = createSelector(
  selectOrganizationsState,
  (state) => state.count
);

export const selectOrganizationsStatus = createSelector(
  selectOrganizationsState,
  (state) => state.status
);
