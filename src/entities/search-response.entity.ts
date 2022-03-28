import { Account } from 'src/models/account/account.entity';
import { Food } from 'src/models/food/entities';

export class SearchResponseEntity {
  users: Account[];
  foods: Food[];
}
