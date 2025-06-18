import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { UserRepository } from './domain/repository/user.repository';
import { UserPrismaRepository } from './infra/prisma/user-prisma.repository';
import { RegisterUserUseCase } from './application/register-user.use-case';
import { LoginUseCase } from './application/login.use-case';
import { UserResolver } from './graphql/user.resolver';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    RegisterUserUseCase,
    LoginUseCase,
    UserResolver,
  ],
  exports: [UserRepository, RegisterUserUseCase, LoginUseCase],
})
export class UserModule {} 