import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import { mongoDbConnectionString, PORT } from './config';
import { ValidationPipeOptions } from './convo/validation/convo.validation';
import { initializeApp } from 'firebase-admin/app';

import {logger} from './logger/logger'

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
logger.error(new Error('error test'))
bootstrap();

const connectToTheDatabase = async () => {
  try {
    await mongoose
      .connect(mongoDbConnectionString, {})
      .then((res) => {})
      .catch((err) => {
        logger.error(err)
        console.log(err);
      });
  } catch (error) {
    logger.error(error)
    throw(error)
    console.log(error);

  }
};




// let log_file_err=fs.createWriteStream(__dirname + '/error.log',{flags:'a'});  

// process.on('uncaughtException', function(err) {
// console.log('Caught exception: Caught exception: Caught exception: Caught exception: Caught exception: Caught exception: Caught exception: Caught exception: Caught exception: Caught exception: Caught exception: Caught exception: Caught exception: ' + err);
// log_file_err.write(util.format('Caught exception: '+err) + '\n');
// });

// process.on('unhandledRejection', function(err) {
//   console.log('Caught exception: \n\nunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejection' + err);
//   log_file_err.write(util.format('Caught exception: '+err) + '\n');
//   });

//   process.on('unhandledPromiseRejection', function(err) {
//     console.log('Caught exception: \n\nunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejectionunhandledRejection' + err);
//     log_file_err.write(util.format('Caught exception: '+err) + '\n');
//     });





connectToTheDatabase().then().catch();


