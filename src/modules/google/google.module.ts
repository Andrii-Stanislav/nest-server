import { Module } from '@nestjs/common';

import { GoogleAuthController } from './google.controller';
import { GoogleAuthService } from './google.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleStrategy],
})
export class GoogleAuthModule {}
