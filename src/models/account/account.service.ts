import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { RepositoryConstant } from 'src/common/constants';
import { StringHelper } from 'src/common/helpers';
import { File } from '../file/entities';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto';

@Injectable()
export class AccountService {
  constructor(
    @Inject(RepositoryConstant.ACCOUNT)
    private readonly accountRepository: typeof Account,
    @Inject(RepositoryConstant.IMAGE)
    private readonly imageRepository: typeof File,
  ) {}

  async create(accountDto: CreateAccountDto): Promise<Account> {
    return this.accountRepository.create({
      ...accountDto,
      password: StringHelper.getMd5(accountDto.password),
    });
  }

  async findOne(username: string): Promise<Account | null> {
    return this.accountRepository.findOne({ where: { username } });
  }

  async setAvatar(idAccount: number, id: number): Promise<number> {
    return this.imageRepository
      .update(
        { type: 0 },
        {
          where: { id, idAccount },
        },
      )
      .then((x) => x[0]);
  }

  async unsetAvatar(idAccount: number, idNewAvatar: number): Promise<void> {
    this.imageRepository.update(
      { type: 1 },
      {
        where: {
          idAccount,
          id: {
            [Op.ne]: idNewAvatar,
          },
        },
      },
    );
  }
}
