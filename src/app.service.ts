import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { RepositoryConstant } from './common/constants';
import { SearchResponseEntity } from './entities';
import { Account } from './models/account/account.entity';
import { Food } from './models/food/entities';
import { File } from './models/file/entities';
import { Country } from './models/country/country.entity';
import { SearchDto } from './dto';

@Injectable()
export class AppService {
  constructor(
    @Inject(RepositoryConstant.FOOD)
    private readonly foodRepository: typeof Food,
    @Inject(RepositoryConstant.ACCOUNT)
    private readonly accountRepository: typeof Account,
  ) {}

  async search(searchDto: SearchDto): Promise<SearchResponseEntity> {
    const { q, isVegetarian, countryCode } = searchDto;

    const accounts = this.accountRepository.findAll({
      limit: 5,
      attributes: {
        exclude: ['password', 'idImage'],
      },
      where: {
        [Op.or]: [
          {
            username: {
              [Op.substring]: q,
            },
          },
          {
            fullName: {
              [Op.substring]: q,
            },
          },
        ],
      },
      include: [
        {
          model: File,
          attributes: {
            exclude: ['id', 'idAccount'],
          },
        },
      ],
    });

    const foods = this.foodRepository.findAll({
      limit: 5,
      where: {
        ...(countryCode ? { countryCode } : {}),
        ...(isVegetarian === null
          ? {}
          : { isVegetarian: isVegetarian === 'true' ? 1 : 0 }),
        name: {
          [Op.substring]: q,
        },
      },
      include: [
        {
          model: File,
          attributes: {
            exclude: ['id', 'idAccount'],
          },
        },
        { model: Country, as: 'country' },
      ],
      attributes: {
        exclude: [
          'idOwner',
          'idImage',
          'countryCode',
          'description',
          'timePost',
          'ingredient',
          'tips',
          'rateSum',
          'voteCount',
        ],
      },
    });

    const response = Promise.all([accounts, foods]).then((values) => ({
      users: values[0],
      foods: values[1],
    }));

    return response;
  }
}
