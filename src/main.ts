import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-extception.filter';
import { ValidationExceptionFilter } from './filters/validation-extception.filter';
import { ValidationPipe } from './pipes/validation.pipe';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication> (
    AppModule
    );

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    //app.setViewEngine('pug');
    app.setViewEngine('hbs');

  //app.useGlobalFilters(new ValidationExceptionFilter());
  //app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
