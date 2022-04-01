import { Injectable } from '@nestjs/common';
import { SearchResponseEntity } from './entities';
import { SearchDto } from './dto';
import { AccountService } from './models/account/account.service';
import { FoodService } from './models/food/food.service';

@Injectable()
export class AppService {
  constructor(
    private readonly accountService: AccountService,
    private readonly foodService: FoodService,
  ) {}

  async search(searchDto: SearchDto): Promise<SearchResponseEntity> {
    const accounts = this.accountService.search(searchDto.q);
    const foods = this.foodService.search(searchDto);

    const response = Promise.all([accounts, foods]).then((values) => ({
      users: values[0],
      foods: values[1],
    }));

    return response;
  }
}
