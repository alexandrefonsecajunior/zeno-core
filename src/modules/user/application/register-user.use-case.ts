import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository, RegisterUserDTO } from '../domain/repository/user.repository';
import { User } from '../domain/models/user.model';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: RegisterUserDTO): Promise<User> {
    try {
      console.log('Registering user', data);
      
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      const existingUsername = await this.userRepository.findByUsername(data.username);
      if (existingUsername) {
        throw new Error('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      console.log('Hashed password', hashedPassword);
      
      const userToCreate = {
        ...data,
        password: hashedPassword,
      };
      
      console.log('Data after hashing', userToCreate);
      const userCreated = await this.userRepository.create(userToCreate);
      console.log('userCreated', userCreated);
      
      return userCreated;
    } catch (error: any) {
      throw new Error(`Error registering user: ${error?.message}`);
    }
  }
} 