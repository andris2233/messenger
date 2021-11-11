import { ISocketMsg } from './common';
export interface IFriendCreate {
  fromId: number;
  toId: number;
}

export type IFriendMsg = {
  toId: number;
}

export type FriendMsgSend = ISocketMsg<IFriendMsg>;
