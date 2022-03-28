import { BadRequestException, NestInterceptor, Type } from '@nestjs/common';
import { AppConstants } from '../constants';
import {
  MulterOptionsFileFilterCallback,
  MulterOptionsFileFilterFile,
} from '../polyfills';
import LocalFilesInterceptor from './local-files.interceptor';

interface LocalImageFilesInterceptorOptions {
  path?: string;
}

function LocalImageFilesInterceptor(
  fieldName: string,
  options?: LocalImageFilesInterceptorOptions,
): Type<NestInterceptor> {
  return LocalFilesInterceptor(fieldName, {
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

export default LocalImageFilesInterceptor;
