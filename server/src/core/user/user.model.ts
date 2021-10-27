import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { IUserCreate } from '@@/common/model/user';

@Table({ tableName: 'user', createdAt: false, updatedAt: false })
export default class UserModel extends Model<UserModel, IUserCreate> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  nickname: string;

  @Column({ type: DataType.STRING })
  firstName: string;

  @Column({ type: DataType.STRING })
  lastName: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isPrivate: boolean;
}
