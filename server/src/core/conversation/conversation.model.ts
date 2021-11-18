import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ConversationTypes, IConversationCreate } from '@@/common/model/conversation';

@Table({ tableName: 'conversation', createdAt: false, updatedAt: false })
export default class ConversationModel extends Model<ConversationModel, IConversationCreate> {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.ENUM({ values: Object.values(ConversationTypes) }),
    defaultValue: ConversationTypes.DIALOGUE,
  })
  cType: ConversationTypes;

  @Column({ type: DataType.DATE, defaultValue: () => new Date() })
  lastMessageDate: Date;
}
