import { Inject, Injectable } from '@nestjs/common';
import { File } from '../file/entities';
import { UploadImageDto } from './dto/image.dto';
import { Sequelize } from 'sequelize-typescript';
import { RepositoryConstant } from 'src/common/constants';

@Injectable()
export class UploadService {
  constructor(
    @Inject(RepositoryConstant.IMAGE)
    private readonly imageRepository: typeof File,
  ) {}

  async uploadImage(uploadImageDto: UploadImageDto): Promise<File> {
    return this.imageRepository.create({
      ...uploadImageDto,
      uploadedAt: Sequelize.fn('GETDATE'),
    });
  }

  async uploadImages(uploadImageDtos: UploadImageDto[]): Promise<File[]> {
    return this.imageRepository.bulkCreate(
      uploadImageDtos.map((uploadImageDto) => ({
        ...uploadImageDto,
        uploadedAt: Sequelize.fn('GETDATE'),
      })),
    );
  }
}
