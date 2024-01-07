import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ConfirmResetPasswordDto {
  @ApiProperty({
    example: 'vdjavdak-adsasdmas-ajdasvdvas',
    description: 'Code for reset password',
  })
  @IsString({ message: 'resetPasswordCode have to be string' })
  readonly resetPasswordCode: string;

  @ApiProperty({ example: 'asd123', description: 'Password' })
  @Length(5, 50, {
    message: 'Password have to be between 8 and 50 characters',
  })
  readonly password: string;
}
