import { Module } from '@nestjs/common';

// config
import { AppConfigsModules } from './configs';

// modules
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GoogleAuthModule } from './modules/google/google.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ...AppConfigsModules,
    UsersModule,
    AuthModule,
    GoogleAuthModule,
    MailModule,
  ],
})
export class AppModule {}
