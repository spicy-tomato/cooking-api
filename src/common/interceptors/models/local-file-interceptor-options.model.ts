import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export interface LocalFileInterceptorOptions {
  path?: string;
  fileFilter?: MulterOptions['fileFilter'];
  limits?: MulterOptions['limits'];
}
