import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API RECIPIES WITH MONGODB')
    .setDescription('API rest for recipies in mongodb')
    .setVersion('1.0')
    .build()
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);



  await app.listen(process.env.PORT);
}
bootstrap();
