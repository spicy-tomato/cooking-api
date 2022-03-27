import { Provider } from '@nestjs/common';
import { Image } from './entities/image.entity';

export const uploadProvider: Provider[] = [
  {
    provide: 'IMAGE_REPOSITORY',
    useValue: Image,
  },
];
