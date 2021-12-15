import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import { mongoDbConnectionString, PORT } from './config';
import { ValidationPipeOptions } from './convo/validation/convo.validation';
import { initializeApp } from 'firebase-admin/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(new ValidationPipeOptions()));
  app.enableCors({
    origin: '*',
  });
  //API Documentation - Swagger Settings
  const config = new DocumentBuilder()
    .setTitle('Convo Service Documentation')
    .setVersion('1.0')
    .addTag('convo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //initializeApp();
  await app.listen(PORT);
}
bootstrap();

const connectToTheDatabase = async () => {
  try {
    await mongoose
      .connect(mongoDbConnectionString, {})
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

connectToTheDatabase().then().catch();
