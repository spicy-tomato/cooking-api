import { Provider } from '@nestjs/common';
import { RepositoryConstant } from 'src/common/constants';
import { Food } from './entities/food.entity';
import { StepDetails } from './entities/step-details.entity';

export const foodProvider: Provider[] = [
  {
    provide: RepositoryConstant.FOOD,
    useValue: Food,
  },
  {
    provide: RepositoryConstant.STEP,
    useValue: StepDetails,
  },
];
