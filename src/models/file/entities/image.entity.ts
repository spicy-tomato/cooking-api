import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class File extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.DATE)
  uploadedAt: Date;

  @Column(DataType.INTEGER)
  idAccount: number;

  @Column(DataType.INTEGER)
  type: number;

  @Column(DataType.STRING)
  mimeType: string;
}
