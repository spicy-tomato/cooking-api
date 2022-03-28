import { FullAccountDto } from './full-account-dto';

export type CreateAccountDto = Omit<FullAccountDto, 'id'>;
