import {
  AutoIncrement,
  Column,
  Table,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'resources',
})
export default class Resource extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  path: string;

  @Column
  uen: string;
}
