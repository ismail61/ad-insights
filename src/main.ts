import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { connect as connectToDatabase } from './internal/connect-to-db';
import { AppModule } from './app.module';
import { coreConfig } from 'config/core';
import { SwaggerConfig } from './internal/swagger.init';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './internal/exception.filter';

async function bootstrap() {
  await connectToDatabase();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(coreConfig.apiPrefix);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  app.use(cookieParser());
  SwaggerConfig(app);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(coreConfig.port);
  console.log(`listing to http://${coreConfig.host}:${coreConfig.port}`);
}
bootstrap();
