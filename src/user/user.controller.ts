import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDecorator } from 'src/auth/decorators/user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  async findMe(@UserDecorator() user: User) {
    return await this.userService.findMe(user.id);
  }
}
