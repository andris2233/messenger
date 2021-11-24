import { ISocketMsg } from './common';

export interface IFriendCreate {
  fromId: number;
  toId: number;
  deleted?: boolean;
  status?: FRIEND_STATUS;
}

export type IFriendSendMsg = { toId: number; };
export type FriendSendMsg = ISocketMsg<IFriendSendMsg>;

export type IFriendApproveMsg = { fromId: number; };
export type FriendApproveMsg = ISocketMsg<IFriendApproveMsg>;

export type IFriendRemoveMsg = { friendId: number; };
export type FriendRemoveMsg = ISocketMsg<IFriendRemoveMsg>;

export type IFriendSeeMsg = { userId: number; };
export type FriendSeeMsg = ISocketMsg<IFriendSeeMsg>;

export enum FRIEND_STATUS {
  CREATED = 'CREATED',
  SEEN = 'SEEN',
  APPROVED = 'APPROVED',
};

export const SOCKET_NAMESPACE = '/socket/friends';
export enum SOCKET_EVENTS {
  ADD_FRIEND = 'addFriend',
  APPROVE_FRIEND = 'approveFriend',
  REMOVE_FRIEND = 'removeFriend',
  SEE_FRIEND = 'seeFriend',
  HIDDEN_ADD_FRIEND = 'hiddenAddFriend'
};
