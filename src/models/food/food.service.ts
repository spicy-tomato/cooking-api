import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { RepositoryConstant } from 'src/common/constants';
import { Account } from '../account/account.entity';
import { Country } from '../country/country.entity';
import { File } from '../file/entities';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from './entities/food.entity';
import { StepDetails } from './entities/step-details.entity';

@Injectable()
export class FoodService {
  constructor(
    @Inject(RepositoryConstant.FOOD)
    private readonly foodRepository: typeof Food,
    @Inject(RepositoryConstant.STEP)
    private readonly stepRepository: typeof StepDetails,
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

  async findByAccountId(id: number): Promise<Food[]> {
    return this.foodRepository.findAll({
      where: { idOwner: id },
      include: [{ model: Country, as: 'country' }],
      attributes: {
        exclude: ['idImage', 'idOwner'],
      },
    });
  }

  async details(idFood: number): Promise<Food> {
    return this.foodRepository.findByPk(idFood, {
      include: [
        {
          model: Account,
          include: [
            {
              model: File,
              attributes: {
                exclude: ['id', 'idAccount'],
              },
            },
          ],
          attributes: {
            exclude: ['password', 'idAccount', 'idImage'],
          },
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
      attributes: {
        exclude: ['idImage', 'idOwner'],
      },
    });
  }
}
