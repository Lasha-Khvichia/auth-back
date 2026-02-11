import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(data: RegisterDto) {
    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }

  async findWithEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
    });

    // if (!user) {
    //   throw new NotFoundException('user not found');
    // }

    return user;
  }

  async findMe(id: number) {
    const me = await this.userRepo.findOne({
      where: { id },
    });

    if (!me) {
      throw new UnauthorizedException('You are not authorized!');
    }

    const { password, ...rest } = me;

    return rest;
  }
}
