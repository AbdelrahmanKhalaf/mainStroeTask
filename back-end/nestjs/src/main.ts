import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  const option = new DocumentBuilder().setTitle('Mian Store API').setDescription('Mian Store API').setVersion('1.0.0').build()
  const document = SwaggerModule.createDocument(app, option)
  SwaggerModule.setup('document', app, document)
  await app.listen(3000);
}
bootstrap();
