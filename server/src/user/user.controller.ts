import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/author.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/decorator/role.enum';

const PUBLISH_KEY = 'isPublic';
export const Publish = () => SetMetadata(PUBLISH_KEY, true); // custom 1 decorator

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseGuards(AuthGuard, RoleGuard)
  async createUser(@Body() user) {
    const result = await this.userService.createUser(user);
    return {
      statusCode: 200,
      message: 'Create user successfully',
      data: result,
    };
  }

  @Get('list')
  @UseGuards(AuthGuard) // check xemco tai khoan chua
  async findAll() {
    const result = await this.userService.getAll();
    return {
      statusCode: 200,
      message: 'Get all user successfully',
      data: result,
    };
  }

  @Publish()
  @Get('/:user_id')
  async getUserById(@Param('user_id') user_id: string) {
    return this.userService.getUserById(+user_id);
  }

  @Patch('changeStatus/:user_id')
  async changeStatus(@Param('user_id') user_id: string) {
    const result = await this.userService.changeStatus(+user_id);
    return {
      statusCode: 200,
      message: 'Change status user successfully',
      data: result,
    };
  }
}
