import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
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
    @Param('id') idAccount: number,
    @Query('idImage') idImage: number,
  ): Promise<number> {
    await this.accountService.unsetAvatar(idAccount);
    return this.accountService.setAvatar(idImage);
  }
}
