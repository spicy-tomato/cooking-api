import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { File } from 'src/models/file/entities';
import { Account } from '../../account/account.entity';
import { Country } from '../../country/country.entity';
import { Rate } from './rate.entity';
import { StepDetails } from './step-details.entity';

@Table
export class Food extends Model {
  /** COLUMNS */
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.INTEGER)
  @ForeignKey(() => Account)
  idOwner: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.INTEGER)
  @ForeignKey(() => File)
  idImage: number;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.BOOLEAN)
  isVegetarian: boolean;

  @Column(DataType.INTEGER)
  difficultLevel: number;

  @Column(DataType.INTEGER)
  timeToCook: number;

  @Column(DataType.STRING)
  @ForeignKey(() => Country)
  countryCode: string;

  @Column(DataType.DATE)
  timePost: Date;

  @Column(DataType.STRING)
  ingredient: string;

  @Column(DataType.STRING)
  tips: string;

  @Column(DataType.INTEGER)
  rateSum: number;

  @Column(DataType.INTEGER)
  voteCount: number;

  @Column({
    type: DataType.VIRTUAL,
    get(): number {
      return this.getDataValue('rateSum') / this.getDataValue('voteCount');
    },
  })
  voteAvg: number;

  /** RELATIONS */
  @BelongsTo(() => Account, 'idOwner')
  owner: Account;

  @BelongsTo(() => Country, 'countryCode')
  country: Country;

  @BelongsTo(() => File, 'idImage')
  image: File;

  @HasMany(() => StepDetails, 'idFood')
  steps: StepDetails[];

  @HasMany(() => Rate, 'idFood')
  rates: Rate[];
}
