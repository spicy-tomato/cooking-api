import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database/database.module';
import { CountryController } from './country.controller';
import { countryProvider } from './country.provider';
import { CountryService } from './country.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CountryController],
  providers: [CountryService, ...countryProvider],
})
export class CountryModule {}
