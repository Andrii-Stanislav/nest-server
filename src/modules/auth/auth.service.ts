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

import { ConfirmResetPasswordDto } from './dto';

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

    const hashPassword = await this.generateHashPassword(userDto.password);

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

  async confirmResetPassword({
    resetPasswordCode,
    password,
  }: ConfirmResetPasswordDto) {
    const user = await this.userService.getUserByResetPasswordCode(
      resetPasswordCode,
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const hashPassword = await this.generateHashPassword(password);
    await this.userService.updateUserById(user.id, {
      password: hashPassword,
      resetPasswordCode: null,
    });

    return { message: 'Password updated' };
  }

  // private methods

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  private async generateHashPassword(password: string) {
    return await bcrypt.hash(password, Number(process.env.PASSWORD_HASH_SALT));
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
