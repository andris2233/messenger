import { Column, DataType, ForeignKey, Table, Model } from 'sequelize-typescript';

import UserModel from '../user/user.model';
import { IFriendCreate } from '@@/common/model/friend';

@Table({ tableName: 'friend', createdAt: false, updatedAt: false })
export default class FriendModel extends Model<FriendModel, IFriendCreate> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
  })
  @ForeignKey(() => UserModel)
  fromId: number;

  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
  })
  @ForeignKey(() => UserModel)
  toId: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  approved: boolean;
}
