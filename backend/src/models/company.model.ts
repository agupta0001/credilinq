import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'companies',
})
export default class Company extends Model {
  @Column
  uen: string;

  @Column
  name: string;
}
