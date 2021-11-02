import { IContactCreate } from '@@/common/model/contact';
import { Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript';
import UserModel from '../user/user.model';

@Table({ tableName: 'contact', createdAt: false, updatedAt: false })
export default class ContactModel extends Model<ContactModel, IContactCreate> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
  })
  @ForeignKey(() => UserModel)
  ownerId: number;

  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
  })
  @ForeignKey(() => UserModel)
  contactId: number;
}
