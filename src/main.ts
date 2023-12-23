import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from './pipes/validation.pipe';
import { corsOptions, setupSwagger } from './configs';

async function start() {
  const PORT = parseInt(process.env.PORT) ?? 3000;
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
