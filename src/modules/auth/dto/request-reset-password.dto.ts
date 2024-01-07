import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class RequestResetPasswordDto {
  @ApiProperty({ example: 'qweqwe@gmail.com', description: 'User email' })
  @IsString({ message: 'User email have to be string' })
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;
}
