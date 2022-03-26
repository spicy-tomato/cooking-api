import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Country extends Model {
  @PrimaryKey
  @Column
  code: string;

  @Column
  name: string;
}
