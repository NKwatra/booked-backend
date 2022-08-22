import { Body, Controller, Post } from '@nestjs/common';
import { Serialize } from '../decorators/serialize.decorator';
import { AddAdminDto } from './dtos/add-admin.dto';
import { UserObjectDto } from './dtos/user-object.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Serialize(UserObjectDto)
  @Post('/admin')
  async addAdmin(@Body() user: AddAdminDto) {
    const newUser = await this.userService.addAdmin(user);
    return newUser;
  }
}
