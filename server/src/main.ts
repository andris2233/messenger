import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableCors({
    origin: ['http://localhost:8080'],
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Messenger')
    .setDescription('Документация API')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, swaggerDocument);

  await app.listen(3000, '10.10.1.227', () => 'server has been started');
}
bootstrap();
