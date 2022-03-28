import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Food } from '../food/entities/food.entity';

@Table
export class Country extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  code: string;

  @Column(DataType.STRING)
  name: string;

  @HasMany(() => Food, 'countryCode')
  foods: Food[];
}
