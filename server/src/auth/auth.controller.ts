import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { Role } from './decorator/role.enum';
import { Roles } from './decorator/role.decorator';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('signUp')
  async signUp(@Body() body: SignUpDto) {
    const { email } = body;
    /** kiem tra email co ton tai bd hay khong */
    const user = await this.userService.getUserByEmail(email);

    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    return this.authService.signUp(body);
  }

  @Post('signIn')
  @HttpCode(201)
  async signIn(@Body() body) {
    /**  */

    const data = await this.authService.signIn(body);

    return {
      message: 'Sign in successfully',
      ...data,
    };
  }
}
