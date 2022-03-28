import { BadRequestException, NestInterceptor, Type } from '@nestjs/common';
import { AppConstants } from '../constants';
import {
  MulterOptionsFileFilterFile,
  MulterOptionsFileFilterCallback,
} from '../polyfills';
import LocalFileInterceptor from './local-file.interceptor';

interface LocalImageFileInterceptorOptions {
  path?: string;
}

function LocalImageFileInterceptor(
  fieldName: string,
  options?: LocalImageFileInterceptorOptions,
): Type<NestInterceptor> {
  return LocalFileInterceptor(fieldName, {
    ...options,
    fileFilter: (
      _: any,
      file: MulterOptionsFileFilterFile,
      callback: MulterOptionsFileFilterCallback,
    ) => {
      if (!file.mimetype.includes('image')) {
        return callback(
          new BadRequestException('Provide a valid image'),
          false,
        );
      }
      callback(null, true);
    },
    limits: { fileSize: AppConstants.FILE_SIZE_LIMITATION },
  });
}

export default LocalImageFileInterceptor;
