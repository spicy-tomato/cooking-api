import { Provider } from '@nestjs/common';
import { RepositoryConstant } from 'src/common/constants';
import { File } from './entities/image.entity';

export const fileProvider: Provider[] = [
  {
    provide: RepositoryConstant.FILE,
    useValue: File,
  },
];
