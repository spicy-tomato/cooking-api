import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  MulterField,
  MulterOptions,
} from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { Observable } from 'rxjs';
import { LocalFileInterceptorOptions } from './models';

function LocalFileFieldsInterceptor(
  uploadFields: MulterField[],
  options: LocalFileInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileFieldsInterceptor: NestInterceptor;
    constructor(configService: ConfigService) {
      const fileDestination = configService.get('UPLOADED_FILES_DESTINATION');
      const destination = `${fileDestination}${options.path || ''}`;

      const multerOptions: MulterOptions = {
        storage: diskStorage({ destination }),
        fileFilter: options.fileFilter,
        limits: options.limits,
      };

      this.fileFieldsInterceptor = new (FileFieldsInterceptor(
        uploadFields,
        multerOptions,
      ))();
    }

    intercept(
      ...args: Parameters<NestInterceptor['intercept']>
    ): Observable<any> | Promise<Observable<any>> {
      return this.fileFieldsInterceptor.intercept(...args);
    }
  }

  return mixin(Interceptor);
}

export default LocalFileFieldsInterceptor;
