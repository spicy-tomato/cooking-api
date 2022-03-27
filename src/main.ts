import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost) as HttpAdapterHost;
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
