import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Image extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
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
