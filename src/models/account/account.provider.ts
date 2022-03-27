import { Provider } from '@nestjs/common';
import { RepositoryConstant } from 'src/common/constants';
import { Account } from './account.entity';

export const accountProvider: Provider[] = [
  {
    provide: RepositoryConstant.ACCOUNT,
    useValue: Account,
  },
];
