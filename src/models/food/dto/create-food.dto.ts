import { StepDto } from './step-details.dto';

export class CreateFoodDto {
  name: string;
  image: number;
  description: string;
  isVegetarian: boolean;
  difficultLevel: number;
  timeToCook: number;
  countryCode: string;
  timePost: Date;
  ingredient: string;
  tips: string;
  steps: StepDto[];
}
