import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as uuid from 'uuid';

import { MailService } from '../mail/mail.service';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  public async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const { token } = this.generateToken(user);
    user.password = '';
    return { token, user };
  }

  public async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(
      userDto.password,
      Number(process.env.PASSWORD_HASH_SALT),
    );

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    const { token } = this.generateToken(user);
    user.password = '';
    return { token, user };
  }

  async requestResetPassword(email: string) {
    const resetPasswordCode = uuid.v4();
    await this.userService.updateUserByEmail(email, { resetPasswordCode });
    await this.mailService.sendRequestResetPassword(email, resetPasswordCode);
    return { message: 'Reset password code sent to your email' };
  }

  // private methods

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const error = new UnauthorizedException({
      message: 'Email or password incorrect',
    });

    if (!user) {
      throw error;
    }
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);
    if (passwordEqual) {
      return user;
    }
    throw error;
  }
}
