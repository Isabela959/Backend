import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Importar ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o CORS para que seu front-end possa acessar a API
  app.enableCors({
    origin: 'http://localhost:3000', // A URL do seu front-end (Vite usa 5173 por padrão)
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
