import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';

import { ExamplesController } from './examples.controller';
import { ExamplesService } from './examples.service';
import { Example } from './examples.model';

@Module({
  controllers: [ExamplesController],
  providers: [ExamplesService],
  imports: [
    SequelizeModule.forFeature([Example]),
    forwardRef(() => AuthModule),
  ],
  exports: [ExamplesService],
})
export class ExamplesModule {}
