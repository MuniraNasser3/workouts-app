// main.ts (in backend)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  Allow frontend (localhost:5173) to access backend (localhost:3000)
  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();

