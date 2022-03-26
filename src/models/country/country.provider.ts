import { Provider } from '@nestjs/common';
import { Country } from './country.entity';

export const countryProvider: Provider[] = [
  {
    provide: 'COUNTRY_REPOSITORY',
    useValue: Country,
  },
];
