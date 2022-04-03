import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JwtValidateResponseDto } from 'src/authentication/dto';
import { JwtUser, Public } from 'src/common/decorators';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getInfo(@JwtUser() user: JwtValidateResponseDto) {
    return this.accountService.findOne(user.username);
  }

  @Get(':username')
  getUserInfo(@Param('username') username: string) {
    return this.accountService.findOne(username);
  }

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

  @Patch('set-avatar')
  async setAvatar(
    @Body() body: { idImage: number },
    @JwtUser() user: JwtValidateResponseDto,
  ): Promise<boolean> {
    const imageIsValid =
      (await this.accountService.setAvatar(user.idAccount, body.idImage)) > 0;

    if (!imageIsValid) {
      throw new ForbiddenException();
    }

    await this.accountService.unsetAvatar(user.idAccount, body.idImage);
    return true;
  }
}
