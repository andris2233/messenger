import { ISocketMsg } from "./common";

export enum ConversationTypes {
  DIALOGUE = 'DIALOGUE',
  CONVERSATION = 'CONVERSATION',
};

export interface IConversationCreate {
  title?: string;
  cType: ConversationTypes;
};

export type ConversationCreate = {
  info: IConversationCreate;
  memberIds: number[];
};

export type CoversationCreateMsg = ISocketMsg<ConversationCreate>;
