import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Account } from '../../account/account.entity';
import { Food } from './food.entity';

@Table({ hasTrigger: true })
export class Rate extends Model {
  /** COLUMNS */
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.INTEGER)
  @ForeignKey(() => Food)
  idFood: number;

  @Column(DataType.INTEGER)
  @ForeignKey(() => Account)
  idOwner: number;

  @Column(DataType.INTEGER)
  rate: number;

  @Column(DataType.STRING)
  comment: string;

  @Column(DataType.DATE)
  timeCreated: Date;

  /** RELATIONS */
  @BelongsTo(() => Account, 'idOwner')
  owner: Account;

  @BelongsTo(() => Food, 'idFood')
  food: Food[];
}
