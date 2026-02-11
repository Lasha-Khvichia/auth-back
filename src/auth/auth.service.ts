import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(data: RegisterDto) {
    const register = await this.userService.create(data);
    const { password, ...rest } = register;
    return { message: 'Successfully registered', user: rest };
  }

  async login(data: LoginDto) {
    const user = await this.userService.findWithEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('User must be authorized');
    }
    const compare = await this.userService.passwordCompare(
      data.password,
      user.password,
    );

    if (!compare) {
      throw new ConflictException('Invalid Credentials!');
    }

    const accessToken = await this.generateToken(user);
    const { password, ...rest } = user;

    return {
      accessToken,
      user: rest,
    };
  }

  async generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }
}
