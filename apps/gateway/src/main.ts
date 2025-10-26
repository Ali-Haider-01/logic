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

  /* Health Check */
  app.getHttpAdapter().get('/', (req: Request, res: Response) => {
    return res.json({
      message: 'Gateway Service is running',
      status: 'healthy',
      timestamp: new Date().toISOString(),
    });
  });

  app.getHttpAdapter().get('/health', (req: Request, res: Response) => {
    return res.json({
      message: 'Gateway Service is running',
      status: 'healthy',
      timestamp: new Date().toISOString(),
    });
  });

  /* Static assets configuration (if needed) */
  // app.useStaticAssets(join(__dirname, 'assets', 'public'));

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
