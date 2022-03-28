import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadImageDto } from './dto';
import { UploadService } from './upload.service';
import { File } from '../file/entities';
import LocalImageFileInterceptor from 'src/common/interceptors/local-image-file.interceptor';
import LocalImageFilesInterceptor from 'src/common/interceptors/local-image-files.interceptor';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtValidateResponseDto } from 'src/authentication/dto';
import { JwtUser } from 'src/common/decorators';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(LocalImageFileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadImageDto,
    @JwtUser() user: JwtValidateResponseDto,
  ): Promise<File> {
    return this.uploadService.uploadImage({
      idAccount: user.idAccount,
      name: file.filename,
      type: body.type,
      mimeType: file.mimetype,
    });
  }

  @Post('images')
  @UseInterceptors(LocalImageFilesInterceptor('files'))
  uploadImages(@UploadedFiles() files: Array<Express.Multer.File>): void {
    console.log(files);
  }

  @Post('images/any')
  @UseInterceptors(AnyFilesInterceptor())
  uploadImagesAny(@UploadedFiles() files: Array<Express.Multer.File>): void {
    console.log(files);
  }
}
