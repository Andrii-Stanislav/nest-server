import { Module } from '@nestjs/common';

// config
import { AppConfigsModules } from './configs';

// modules
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [...AppConfigsModules, UsersModule, AuthModule],
})
export class AppModule {}
