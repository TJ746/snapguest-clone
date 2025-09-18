import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Declare process for TypeScript
declare const process: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://frontend-bgqgxhnjy-tjs-projects-e59fb6d9.vercel.app'],
    credentials: true,
  });
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend running on port ${port}`);
}
bootstrap();
