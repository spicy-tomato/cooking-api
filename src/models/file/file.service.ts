import { Inject, Injectable } from '@nestjs/common';
import { RepositoryConstant } from 'src/common/constants';
import { File } from './entities';

@Injectable()
export class FileService {
  constructor(
    @Inject(RepositoryConstant.FILE)
    private readonly imageRepository: typeof File,
  ) {}

  findOne(name: string): Promise<File> {
    return this.imageRepository.findOne({ where: { name } });
  }
}
