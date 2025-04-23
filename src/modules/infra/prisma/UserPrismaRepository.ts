// src/modules/user/infra/UserPrismaRepository.ts

import { prisma } from "../../../shared/infra/prisma/client";
import { User } from "../../domain/models/User";
import { UserRepository } from "../../domain/repository/UserRepository";

export class UserPrismaRepository implements UserRepository {
  async create({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const user = await prisma.user.create({ data: { name, email, password } });
    return new User(user.id, user.name, user.email);
  }

  async findAll() {
    const users = await prisma.user.findMany();
    return users.map((u) => new User(u.id, u.name, u.email));
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const { id, name, email: userEmail, password } = user;
    const userData = new User(id, name, userEmail, password);
    return userData;
  }
}
