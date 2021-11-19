import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ConversationTypes, IConversationCreate } from '@@/common/model/conversation';
import ConversationMembersModel from './conversation-members.model';
import sequelize from 'sequelize';
import UserModel from '../user/user.model';

@Table({ tableName: 'conversation', createdAt: false, updatedAt: false })
export default class ConversationModel extends Model<ConversationModel, IConversationCreate> {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.ENUM({ values: Object.values(ConversationTypes) }),
    defaultValue: ConversationTypes.DIALOGUE,
  })
  cType: ConversationTypes;

  @Column({ type: DataType.STRING })
  title: ConversationTypes;

  @Column({ type: DataType.DATE, defaultValue: sequelize.fn('now'), allowNull: false })
  lastMessageDate: Date;

  @BelongsToMany(() => UserModel, () => ConversationMembersModel)
  conversationMembers: UserModel[];
}
