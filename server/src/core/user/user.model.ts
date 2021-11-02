import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { IUserCreate } from '@@/common/model/user';
import ContactModel from '../contact/contact.model';

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

  @Column({ type: DataType.STRING, unique: true })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING })
  firstName: string;

  @Column({ type: DataType.STRING })
  lastName: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isPrivate: boolean;
  @HasMany(() => ContactModel, { foreignKey: 'ownerId' })
  contacts: ContactModel[];
}
