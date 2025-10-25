/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { urlencoded, json, Response, Request } from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayModule);
  const config = app.get<ConfigService>(ConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
 
/* CORS Configuration */
app.enableCors({
  origin: '*',
});

/* Removed Express Powered By */
app.disable('x-powered-by');

/* Removed 304 Redirects */
app.disable('etag');

/* Increased JSON Body Size */
app.use(json({ limit: '50mb' }));

/* Increased Form Data Size */
app.use(urlencoded({ limit: '50mb', extended: true }));

/* Health Check Redirect */
app.getHttpAdapter().get('/', (req: Request, res: Response) => {
  return res.redirect('/health-check/view');
});

/* Added HTML Renderer Engine & Configurations */
app.setViewEngine('ejs');
app.useStaticAssets(join(__dirname, 'assets', 'public'));
app.setBaseViewsDir(join(__dirname, 'assets', 'views'));


  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: { persistAuthorization: true },
  });
  
  await app.listen(config.get('GATEWAY_PORT'));
 
}

bootstrap();
