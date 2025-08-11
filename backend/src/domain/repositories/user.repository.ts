import { User } from "../entities/user.entity";

export abstract class UserRepository {
  abstract create(data: Omit<User, "id">): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract updatePassword(userId: string, newPassword: string): Promise<void>;
}
