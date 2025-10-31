import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TimeController } from './time.controller';
import { ItemsController } from './items.controller';

@Module({
  controllers: [TimeController, ItemsController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.enableCors({ origin: true });
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
