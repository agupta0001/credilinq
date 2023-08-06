import {
  AutoIncrement,
  Column,
  Table,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export default class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  fullName: string;

  @Column
  position: string;

  @Column
  email: string;

  @Column
  phoneNumber: string;

  @Column
  uen: string;
}
