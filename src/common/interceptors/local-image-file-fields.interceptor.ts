import { BadRequestException, NestInterceptor, Type } from '@nestjs/common';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { AppConstants } from '../constants';
import {
  MulterOptionsFileFilterFile,
  MulterOptionsFileFilterCallback,
} from '../polyfills';
import LocalFileFieldsInterceptor from './local-file-fields.interceptor';

interface LocalImageFileInterceptorOptions {
  path?: string;
}

function LocalImageFileFieldsInterceptor(
  uploadFields: MulterField[],
  options?: LocalImageFileInterceptorOptions,
): Type<NestInterceptor> {
  return LocalFileFieldsInterceptor(uploadFields, {
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

export default LocalImageFileFieldsInterceptor;
