import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SerializeList } from '../decorators/serialize-list.decorator';
import { OrganizationObjectDto } from '../organization/dtos/organization-object.dto';
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

  @SerializeList(OrganizationObjectDto)
  @Get('/organizations')
  async getOrgsForUser(@Query('email') email: string) {
    const organizations = await this.userService.getOrgsForUser(email);
    return organizations;
  }
}
