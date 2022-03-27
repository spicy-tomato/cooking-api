import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/mssql/database.module';
import { uploadProvider } from '../upload/upload.provider';
import { AccountController } from './account.controller';
import { accountProvider } from './account.provider';
import { AccountService } from './account.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [AccountService, ...accountProvider, ...uploadProvider],
  exports: [AccountService],
})
export class AccountModule {}
