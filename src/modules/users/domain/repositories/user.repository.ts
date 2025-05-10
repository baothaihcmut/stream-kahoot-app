import { User } from '../entities/user';

export interface UserRepository {
  findUserByEmail(email: string): Promise<User>;
  createUser(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;
}
