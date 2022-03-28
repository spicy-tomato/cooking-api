import { Provider } from '@nestjs/common';
import { RepositoryConstant } from 'src/common/constants';
import { Food, Rate } from './entities';
import { StepDetails } from './entities/step-details.entity';

export const foodProvider: Provider[] = [
  {
    provide: RepositoryConstant.FOOD,
    useValue: Food,
  },
  {
    provide: RepositoryConstant.RATE,
    useValue: Rate,
  },
  {
    provide: RepositoryConstant.STEP,
    useValue: StepDetails,
  },
];
