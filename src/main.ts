import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import morgan = require('morgan');

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.setGlobalPrefix('MySecurityTouch-RestApi');

  const options = new DocumentBuilder()
    .setTitle('My Security Touch API Documentation')
    .setDescription('Plataforma Swagger en donde se describen los servicios de la aplicacion backend de MySecurityTouch')
    .setVersion('1.0')
    .addTag('MySecurityTouch')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('apiRest', app, document);

  await app.listen(AppModule.port);
}
bootstrap();
