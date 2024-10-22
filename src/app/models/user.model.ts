import { ROLES } from "./role.model";

export interface IUser {
  id: number,
  username: string,
  password: string,
  role: ROLES,
}
