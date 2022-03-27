import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtValidateResponseDto } from 'src/authentication/dto';
import { AuthUser, Public } from 'src/common/decorators';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { TypeHelper } from 'src/common/helpers';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @Public()
  async signUp(@Body() accountDto: CreateAccountDto): Promise<Account> {
    return this.accountService.create(accountDto);
  }

  @Patch('set-avatar/:id')
  @UseGuards(JwtAuthGuard)
  async setAvatar(
    @Param('id') idAccount: string,
    @Query('idImage') idImage: string,
    @AuthUser() jwtUser: JwtValidateResponseDto,
  ): Promise<boolean> {
    const idAccount_n = parseInt(idAccount);
    const idImage_n = parseInt(idImage);

    if (!TypeHelper.isNumber(idImage_n) || !TypeHelper.isNumber(idAccount_n)) {
      throw new BadRequestException();
    }

    if (`${jwtUser.userId}` !== idAccount) {
      throw new UnauthorizedException();
    }

    const imageIsValid =
      (await this.accountService.setAvatar(idAccount_n, idImage_n)) > 0;

    if (!imageIsValid) {
      throw new BadRequestException();
    }

    await this.accountService.unsetAvatar(idAccount_n, idImage_n);
    return true;
  }
}
