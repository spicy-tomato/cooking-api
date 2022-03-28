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
import { Food } from '../food/entities';

@Table
export class Account extends Model {
  /** COLUMNS */
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  fullName: string;

  @Column(DataType.INTEGER)
  @ForeignKey(() => File)
  idImage: number;

  /** RELATIONS */
  @HasMany(() => Food, 'idOwner')
  foods: Food[];

  @BelongsTo(() => File, 'idImage')
  image: File;
}
