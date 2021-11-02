import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { IBlackListCreate } from '@@/common/model/black-list';
import UserModel from '../user/user.model';

@Table({ tableName: 'black_list', createdAt: false, updatedAt: false })
export class BlackListModel extends Model<BlackListModel, IBlackListCreate> {
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
  blockedId: number;
}
