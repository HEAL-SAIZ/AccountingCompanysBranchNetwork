import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IParentOrganization } from '../../models/parent-organization.model';

export const organizationsListActions = createActionGroup({
  source: 'Organization List/Tree Page',
  events: {
    getOrganizations: emptyProps(),
    getOrganizationsSuccess: props<{ orgaizations: IParentOrganization[] }>(),
    getOrganizationsFailed: props<{ error: any }>(),
  }
});

export const organizationPageActions = createActionGroup({
  source: 'Organization Page',
  events: {
    getOrganizationById: props<{ id: number }>(),
    getOrganizationByIdSuccess: props<{ organization: IParentOrganization }>(),
    getOrganizationByIdFailed: props<{ error: any }>(),

    createOrganization: props<{ organization: IParentOrganization }>(),
    createOrganizationSuccess: props<{ organization: IParentOrganization }>(),
    createOrganizationFailed: props<{ error: any }>(),

    updateOrganization: props<{ organization: IParentOrganization }>(),
    updateOrganizationSuccess: props<{ organization: IParentOrganization }>(),
    updateOrganizationFailed: props<{ error: any }>(),

    deleteOrganization: props<{ id: number }>(),
    deleteOrganizationSuccess: emptyProps(),
    deleteOrganizationFailed: props<{ error: any }>(),
  }
});
