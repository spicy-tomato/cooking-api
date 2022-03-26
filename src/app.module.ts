import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database/database.module';
import { AccountModule } from './models/account/account.module';
import { CountryModule } from './models/country/country.module';

@Module({
  imports: [DatabaseModule, CountryModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
