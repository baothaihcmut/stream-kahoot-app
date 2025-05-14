import { UUID } from 'crypto';
import { User } from '../entities/user';

export const UserRepositoryToken = Symbol('user-repisitory');

export interface UserRepository {
  findUserByEmail(email: string): Promise<User>;
  findUserById(id: UUID): Promise<User>;
  createUser(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;
}
