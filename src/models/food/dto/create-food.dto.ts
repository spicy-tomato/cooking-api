import { StepDto } from './step-details.dto';

export class CreateFoodDto {
  data: {
    name: string;
    image: number;
    description: string;
    isVegetarian: boolean;
    difficultLevel: number;
    timeToCook: number;
    countryCode: string;
    ingredient: string;
    tips: string;
    steps: StepDto[];
  };
}
