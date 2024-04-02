import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDto) {
    const { password, ...rest } = body;
    /** logic max hoa password */
    const hashPassword = await argon2.hash(password);

    const newUser = {
      ...rest,
      password: hashPassword,
    };

    await this.userService.createUser(newUser);
    return {
      message: 'User created successfully',
      status: 200,
      data: newUser,
    };
  }

  async signIn(userInfo: any) {
    /** check thong tin user */
    const user = await this.userService.getUserByEmail(userInfo.email);
    const isMatch =
      user && (await argon2.verify(user.password, userInfo.password));
    if (!user || !isMatch) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    /** san sinh token  */
    return {
      token: await this.generateAccessToken({
        email: user.email,
        id: user.user_id,
        roles: user.role,
      }),
      user: user,
    };
  }

  async generateAccessToken(payload) {
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: 'token',
    });
  }

  verifyAccessToken(token) {
    return this.jwtService.verify(token, {
      secret: 'token',
    });
  }
}
