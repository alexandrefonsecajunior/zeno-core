import { User } from "../models/User";

export interface UserRepository {
  create(user: { name: string; email: string }): Promise<User>;
  findAll(): Promise<Omit<User, "password">[]>;
  findByEmail(email: string): Promise<User | null>;
}
