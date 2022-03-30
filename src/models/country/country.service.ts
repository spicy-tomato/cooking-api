import { Inject, Injectable } from '@nestjs/common';
import { RepositoryConstant } from 'src/common/constants';
import { Country } from './country.entity';

@Injectable()
export class CountryService {
  constructor(
    @Inject(RepositoryConstant.COUNTRY)
    private readonly countryRepository: typeof Country,
  ) {}

  async findAll(): Promise<Country[]> {
    return this.countryRepository.findAll({
      order: ['name'],
    });
  }
}
