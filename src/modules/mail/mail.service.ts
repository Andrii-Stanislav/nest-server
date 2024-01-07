import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendRequestResetPassword(email: string, resetPasswordCode: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: 'example@gmail.com',
      subject: 'Reset password for Nice App!',
      template: './resetPassword.hbs',
      context: { email: email, resetPasswordCode },
    });
  }
}
