import { Provider } from '@nestjs/common';
import { Account } from './account.entity';

export const accountProvider: Provider[] = [
  {
    provide: 'ACCOUNT_REPOSITORY',
    useValue: Account,
  },
];
