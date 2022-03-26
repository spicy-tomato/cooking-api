import { Controller, Get } from '@nestjs/common';
import { Country } from './country.entity';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll(): Promise<Country[]> {
    return this.countryService.findAll();
  }
}
