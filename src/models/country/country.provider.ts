import { Provider } from '@nestjs/common';
import { RepositoryConstant } from 'src/common/constants';
import { Country } from './country.entity';

export const countryProvider: Provider[] = [
  {
    provide: RepositoryConstant.COUNTRY,
    useValue: Country,
  },
];
