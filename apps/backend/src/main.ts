import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Declare process for TypeScript
declare const process: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allow all origins explicitly
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false, // Disable credentials for now
  });
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend running on port ${port}`);
}
bootstrap();
