import { Controller, Get, Query, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async getByName(
    @Query('name') name: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const file = await this.fileService.findOne(name);
    if (!file) {
      return null;
    }

    const stream = createReadStream(join(process.cwd(), 'images', file.name));

    response.set({
      'Content-Disposition': `inline; filename="${file.name}"`,
      'Content-Type': file.mimeType,
    });

    return new StreamableFile(stream);
  }
}
