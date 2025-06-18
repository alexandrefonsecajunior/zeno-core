import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  await app.listen(4000);
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}
bootstrap(); 