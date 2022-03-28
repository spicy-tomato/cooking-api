import { FullAccountDto } from './full-account-dto';

export type AccountDto = Omit<FullAccountDto, 'id' | 'password'>;
