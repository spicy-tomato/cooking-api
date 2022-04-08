import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { RepositoryConstant } from 'src/common/constants';
import { SearchDto } from 'src/dto';
import { Account } from '../account/account.entity';
import { Country } from '../country/country.entity';
import { File } from '../file/entities';
import { CreateRateDto } from './dto';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food, Rate, StepDetails } from './entities';

@Injectable()
export class FoodService {
  constructor(
    @Inject(RepositoryConstant.FOOD)
    private readonly foodRepository: typeof Food,
    @Inject(RepositoryConstant.STEP)
    private readonly stepRepository: typeof StepDetails,
    @Inject(RepositoryConstant.RATE)
    private readonly rateRepository: typeof Rate,
  ) {}

  async create(
    foodDto: CreateFoodDto,
    idOwner: number,
    idImage: number,
  ): Promise<Food> {
    return this.foodRepository.create({
      ...foodDto.data,
      idImage,
      idOwner,
      timePost: Sequelize.fn('GETDATE'),
    });
  }

  async createSteps(
    foodDto: CreateFoodDto,
    idFood: number,
    image: File[],
  ): Promise<StepDetails[]> {
    return this.stepRepository.bulkCreate(
      foodDto.data.steps.map((step, i) => ({
        ...step,
        idImage: image[i].id,
        idFood,
      })),
    );
  }

  async createRate(
    rateDto: CreateRateDto,
    idOwner: number,
    idFood: number,
  ): Promise<Rate> {
    return this.rateRepository.create({
      ...rateDto,
      idOwner,
      idFood,
      timeCreated: Sequelize.fn('GETDATE'),
    });
  }

  async findByAccountId(id: number): Promise<Food[]> {
    return this.foodRepository.findAll({
      where: { idOwner: id },
      attributes: {
        exclude: ['idImage', 'idOwner'],
      },
      include: [
        { model: Country },
        {
          model: File,
          attributes: {
            exclude: ['id', 'idAccount'],
          },
        },
      ],
    });
  }

  async find(idFood: number): Promise<Food> {
    return this.foodRepository.findByPk(idFood, {
      attributes: {
        exclude: ['idImage', 'idOwner', 'countryCode'],
      },
      include: [
        {
          model: Account,
          attributes: {
            exclude: ['password', 'idAccount', 'idImage'],
          },
          include: [
            {
              model: File,
              attributes: {
                exclude: ['id', 'idAccount'],
              },
            },
          ],
        },
        {
          model: Rate,
        },
        {
          model: Country,
          as: 'country',
        },
        {
          model: StepDetails,
          as: 'steps',
          include: [
            {
              model: File,
              attributes: {
                exclude: ['id', 'idImage', 'idAccount'],
              },
            },
          ],
          attributes: {
            exclude: ['id', 'idFood', 'idImage'],
          },
        },
        {
          model: File,
          attributes: {
            exclude: ['id', 'idAccount'],
          },
        },
      ],
    });
  }

  async findRated(idOwner: number): Promise<Food[]> {
    const ratedFoodIds = (
      this.foodRepository.sequelize.getQueryInterface().queryGenerator as any
    )
      .selectQuery('Rate', {
        attributes: ['idFood'],
        where: { idOwner },
      })
      .slice(0, -1);

    return this.foodRepository.findAll({
      attributes: {
        exclude: ['idImage', 'idOwner', 'rates'],
      },
      include: [
        { model: Country },
        {
          model: File,
          attributes: {
            exclude: ['id', 'idAccount'],
          },
        },
      ],
      where: {
        id: {
          [Op.in]: Sequelize.literal(`(${ratedFoodIds})`),
        },
      },
    });
  }

  async search(searchDto: SearchDto): Promise<Food[]> {
    const { q, isVegetarian, countryCode } = searchDto;

    return this.foodRepository.findAll({
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
        ],
      },
    });
  }

  async findRate(idFood: number): Promise<Rate[]> {
    return this.rateRepository.findAll({
      where: { idFood },
    });
  }
}
