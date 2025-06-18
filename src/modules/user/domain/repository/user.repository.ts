import { User } from '../models/user.model';

export interface RegisterUserDTO {
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export abstract class UserRepository {
  abstract create(user: RegisterUserDTO): Promise<User>;
  abstract findAll(): Promise<Omit<User, 'password'>[]>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByUsername(username: string): Promise<User | null>;
} 