import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RegisterUserUseCase } from '../application/register-user.use-case';
import { LoginUseCase } from '../application/login.use-case';
import { UserRepository } from '../domain/repository/user.repository';
import { UserType } from './types/user.type';
import { AuthResponse } from './types/auth-response.type';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly userRepository: UserRepository,
  ) {}

  @Query(() => [UserType])
  async users(): Promise<UserType[]> {
    return this.userRepository.findAll();
  }

  @Mutation(() => UserType)
  async registerUser(@Args('input') input: RegisterUserInput): Promise<UserType> {
    const user = await this.registerUserUseCase.execute(input);
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
    };
  }

  @Mutation(() => AuthResponse)
  async loginUser(@Args('input') input: LoginUserInput): Promise<AuthResponse> {
    const result = await this.loginUseCase.execute(input);
    return {
      token: result.token,
      user: {
        id: result.user.id,
        username: result.user.username,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        dateOfBirth: result.user.dateOfBirth,
        email: result.user.email,
      },
    };
  }
} 