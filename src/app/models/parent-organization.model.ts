import { IBranchUnit } from "./branch-unit.model";

export interface IParentOrganization {
  id?: number,
  name: string,
  shortName?: string,
  inn?: string,
  kpp?: string,
  founder?: string,
  address?: string,
  phone?: string,
  branchUnits?: IBranchUnit[],
}
