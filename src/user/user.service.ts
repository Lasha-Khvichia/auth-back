import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/create-auth.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(data: RegisterDto) {
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('You must confirm password!');
    }

    const existing = await this.findWithEmail(data.email);
    if (existing) {
      throw new ConflictException('User already exists!');
    }
    console.log('email is free to use');

    const password = bcrypt.hashSync(data.password, 10);
    data.password = password;
    return await this.userRepo.create(data);
  }

  async passwordCompare(password: string, cryptedPassword: string) {
    const pass = bcrypt.compareSync(password, cryptedPassword);
    return pass;
  }

  async findWithEmail(email: string) {
    return await this.userRepo.findWithEmail(email);
  }

  async findMe(id: number) {
    return await this.userRepo.findMe(id);
  }
}
