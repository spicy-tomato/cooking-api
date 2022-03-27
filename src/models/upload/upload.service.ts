import { Inject, Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';
import { UploadImageDto } from './dto/image.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UploadService {
  constructor(
    @Inject('IMAGE_REPOSITORY')
    private readonly imageRepository: typeof Image,
  ) {}

  async uploadImage(uploadImageDto: UploadImageDto): Promise<Image> {
    return this.imageRepository.create({
      ...uploadImageDto,
      uploadedAt: Sequelize.fn('GETDATE'),
    });
  }
}
