import { User } from '../models/user.model';

export interface listUser {
  total: number;
  users: User[];
}
