import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Country extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  code: string;

  @Column(DataType.STRING)
  name: string;
}
