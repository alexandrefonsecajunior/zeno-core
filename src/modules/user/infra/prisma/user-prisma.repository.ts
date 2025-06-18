import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/prisma/prisma.service';
import { User } from '../../domain/models/user.model';
import { RegisterUserDTO, UserRepository } from '../../domain/repository/user.repository';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    username,
    firstName,
    lastName,
    dateOfBirth,
    email,
    password,
  }: RegisterUserDTO): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        email,
        password,
      },
    });

    return new User(
      user.id,
      user.username,
      user.firstName,
      user.lastName,
      user.dateOfBirth,
      user.email,
      user.password,
    );
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        email: true,
      },
    });

    return users.map(
      (u) =>
        new User(
          u.id,
          u.username,
          u.firstName,
          u.lastName,
          u.dateOfBirth,
          u.email,
        ),
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return new User(
      user.id,
      user.username,
      user.firstName,
      user.lastName,
      user.dateOfBirth,
      user.email,
      user.password,
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) return null;

    return new User(
      user.id,
      user.username,
      user.firstName,
      user.lastName,
      user.dateOfBirth,
      user.email,
      user.password,
    );
  }
} 