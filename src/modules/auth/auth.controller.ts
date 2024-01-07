import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto } from '../users/dto';

import { AuthService } from './auth.service';
import { RequestResetPasswordDto, ConfirmResetPasswordDto } from './dto';

@ApiTags('Auth route')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: null })
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Registration user' })
  @ApiResponse({ status: 200, type: null })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Request reset password' })
  @ApiResponse({ status: 200, type: null })
  @Post('/requestResetPassword')
  requestResetPassword_(@Body() body: RequestResetPasswordDto) {
    return this.authService.requestResetPassword(body.email);
  }

  @ApiOperation({ summary: 'Confirm reset password' })
  @ApiResponse({ status: 200, type: null })
  @Post('/confirmResetPassword_')
  confirmResetPassword_(@Body() body: ConfirmResetPasswordDto) {
    return this.authService.confirmResetPassword(body);
  }
}
