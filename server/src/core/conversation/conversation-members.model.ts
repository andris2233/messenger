import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import UserModel from '../user/user.model';
import ConversationModel from './conversation.model';

@Table({ tableName: 'conversationMembers', createdAt: false, updatedAt: false })
export default class ConversationMembersModel extends Model<ConversationMembersModel> {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @ForeignKey(() => UserModel)
  userId: number;

  @Column({ primaryKey: true, type: DataType.INTEGER })
  @ForeignKey(() => ConversationModel)
  conversationId: number;
}
