import { Inject, Injectable } from '@nestjs/common';
import { Country } from './country.entity';

@Injectable()
export class CountryService {
  constructor(
    @Inject('COUNTRY_REPOSITORY')
    private readonly countryRepository: typeof Country,
  ) {}

  async findAll(): Promise<Country[]> {
    return this.countryRepository.findAll();
  }
}
