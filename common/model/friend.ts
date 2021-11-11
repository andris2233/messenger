import { ISocketMsg } from './common';

export interface IFriendCreate { fromId: number; toId: number; }

export type IFriendSendMsg = { toId: number; };
export type FriendSendMsg = ISocketMsg<IFriendSendMsg>;

export type IFriendApproveMsg = { fromId: number; };
export type FriendApproveMsg = ISocketMsg<IFriendApproveMsg>;
