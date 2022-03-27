import {
  Body,
  Controller,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthUser, Public } from 'src/common/decorators';
import { ToNumberPipe } from 'src/common/pipes';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @Public()
  async signUp(@Body() accountDto: CreateAccountDto): Promise<Account> {
    return this.accountService.create(accountDto).catch((e) => {
      if (e.name === 'SequelizeUniqueConstraintError') {
        throw new HttpException(
          {
            message: 'This username already exists',
          },
          HttpStatus.CONFLICT,
        );
      }
      throw e;
    });
  }

  @Patch('set-avatar/:id')
  async setAvatar(
    @Param('id', ToNumberPipe) idAccount: number,
    @Query('idImage', ToNumberPipe) idImage: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @AuthUser({ loc: 'params', key: 'id' }) _: any,
  ): Promise<boolean> {
    const imageIsValid =
      (await this.accountService.setAvatar(idAccount, idImage)) > 0;

    if (!imageIsValid) {
      throw new ForbiddenException();
    }

    await this.accountService.unsetAvatar(idAccount, idImage);
    return true;
  }
}
