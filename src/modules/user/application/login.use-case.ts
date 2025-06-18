import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRepository, LoginDTO } from '../domain/repository/user.repository';
import { User } from '../domain/models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'zeno_dev_secret';

@Injectable()
export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: LoginDTO): Promise<{ token: string; user: User }> {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);

    console.log('Login user', user);

    if (!user) throw new Error('Usuário não encontrado');

    if (!user.password) throw new Error('Usuário não possui senha');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Senha incorreta');

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    return {
      token,
      user,
    };
  }
} 