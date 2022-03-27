import { AccountDto } from './account-dto';

export type CreateAccountDto = Omit<AccountDto, 'id'>;
