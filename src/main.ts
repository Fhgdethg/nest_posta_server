import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '@modules/app.module';

import { routes } from '@constants/routes';

async function bootstrap() {
  const CLIENT_URLS = `${process.env.CLIENT_URLS}`.split('|');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(routes.api);
  app.use(cookieParser());
  app.enableCors({
    origin: CLIENT_URLS,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  const config = new DocumentBuilder()
    .setTitle('Store server')
    .setDescription('Backend for store system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(routes.swagger, app, document);

  const PORT = Number(process.env.PORT);
  await app.listen(PORT);
}
bootstrap();
