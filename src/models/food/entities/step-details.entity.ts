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
import { Food } from './food.entity';
import { File } from 'src/models/file/entities';

@Table
export class StepDetails extends Model {
  /** COLUMNS */
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.INTEGER)
  @ForeignKey(() => Food)
  idFood: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.INTEGER)
  stepNumber: number;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.INTEGER)
  @ForeignKey(() => File)
  idImage: number;

  /** RELATIONS */
  @BelongsTo(() => Food, 'idFood')
  owner: Food;

  @BelongsTo(() => File, 'idImage')
  images: File;
}
