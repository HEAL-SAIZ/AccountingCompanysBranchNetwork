import { createFeature, createReducer, on } from "@ngrx/store";
import { organizationsListActions, organizationPageActions } from "./parent-organizations.actions";
import { ORGANIZATIONS_FEATURE_KEY } from "./parent-organizations.selectors";
import { IParentOrganization } from "../../models/parent-organization.model";

export interface OrganizationsState {
  currentOrganization: IParentOrganization | null,
  organizations: IParentOrganization[],
  count: number,
  status: string
};

export const initialOrganizationsState: OrganizationsState = {
  currentOrganization: null,
  organizations: [],
  count: 0,
  status: ''
};

export const organizationsFeature = createFeature({
  name: ORGANIZATIONS_FEATURE_KEY,
  reducer: createReducer(
    initialOrganizationsState,
    on(organizationsListActions.getOrganizations, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(organizationsListActions.getOrganizationsSuccess, (state, { orgaizations }) => ({
      ...state,
      organizations: orgaizations,
      status: 'success',
    })),
    on(organizationsListActions.getOrganizationsFailed, (state) => ({
      ...state,
      status: 'error'
    })),

    on(organizationPageActions.getOrganizationById, (state,) => ({
      ...state,
      status: 'loading'
    })),
    on(organizationPageActions.getOrganizationByIdSuccess, (state, { organization }) => ({
      ...state,
      currentOrganization: organization,
      status: 'success'
    })),
    on(organizationPageActions.getOrganizationByIdFailed, (state) => ({
      ...state,
      status: 'error'
    })),

    on(organizationPageActions.createOrganization, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(organizationPageActions.createOrganizationSuccess, (state, { organization }) => ({
      ...state,
      currentOrganization: organization,
      status: 'success'
    })),
    on(organizationPageActions.createOrganizationFailed, (state) => ({
      ...state,
      status: 'error'
    })),

    on(organizationPageActions.updateOrganization, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(organizationPageActions.updateOrganizationSuccess, (state, { organization }) => ({
      ...state,
      currentOrganization: organization,
      status: 'success'
    })),
    on(organizationPageActions.updateOrganizationFailed, (state) => ({
      ...state,
      status: 'error'
    })),

    on(organizationPageActions.deleteOrganization, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(organizationPageActions.deleteOrganizationSuccess, (state) => ({
      ...state,
      currentOrganization: null,
      status: 'success'
    })),
    on(organizationPageActions.deleteOrganizationFailed, (state) => ({
      ...state,
      status: 'error'
    })),
  )
});
