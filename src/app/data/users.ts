import { ROLES } from "../models/role.model";
import { IUser } from "../models/user.model";

export const users: IUser[] = [
  {
    id: 0,
    username: 'test',
    password: '123',
    role: ROLES.USER
  },
  {
    id: 1,
    username: 'admin',
    password: '123',
    role: ROLES.ADMIN
  }
]
