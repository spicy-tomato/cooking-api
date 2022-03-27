import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Image extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column({ type: DataType.DATE })
  uploadedAt: Date;

  @Column(DataType.INTEGER)
  idAccount: number;

  @Column(DataType.INTEGER)
  type: number;
}
