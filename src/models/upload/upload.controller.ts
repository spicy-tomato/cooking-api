import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageDto } from './dto';
import { UploadService } from './upload.service';
import { File } from '../file/entities';
import LocalFileInterceptor from 'src/common/interceptors/local-file.interceptor';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image/:id')
  @UseInterceptors(
    LocalFileInterceptor({
      fieldName: 'file',
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(1024, 2),
      },
    }),
  )
  async uploadFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadImageDto,
  ): Promise<File> {
    return this.uploadService.uploadImage({
      idAccount: id,
      name: file.filename,
      type: body.type,
      mimeType: file.mimetype,
      uploadedAt: new Date(),
    });
  }

  @Post('images')
  @UseInterceptors(FileInterceptor('files', { dest: './images' }))
  uploadFiles(@UploadedFile() files: Array<Express.Multer.File>): void {
    console.log(files);
  }
}
