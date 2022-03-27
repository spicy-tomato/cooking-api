import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { Observable } from 'rxjs';

interface LocalFileInterceptorOptions {
  fieldName: string;
  path?: string;
}

function LocalFileInterceptor(
  options: LocalFileInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor(configService: ConfigService) {
      const fileDestination = configService.get('UPLOADED_FILES_DESTINATION');
      const destination = `${fileDestination}${options.path}`;

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
        }),
      };

      this.fileInterceptor = new (FileInterceptor(
        options.fieldName,
        multerOptions,
      ))();
    }

    intercept(
      ...args: Parameters<NestInterceptor['intercept']>
    ): Observable<any> | Promise<Observable<any>> {
      return this.fileInterceptor.intercept(...args);
    }
  }

  return mixin(Interceptor);
}

export default LocalFileInterceptor;