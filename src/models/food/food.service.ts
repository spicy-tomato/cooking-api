import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { RepositoryConstant } from 'src/common/constants';
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
      ...foodDto,
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
      foodDto.steps.map((step, i) => ({
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
        { model: Country, as: 'country' },
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

  async findRate(idFood: number): Promise<Rate[]> {
    return this.rateRepository.findAll({
      where: {
        idFood,
      },
    });
  }
}
