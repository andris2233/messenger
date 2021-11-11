import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export default class SocketService {
  private socketState = new Map<number, Socket[]>();

  add(userId: number, socket: Socket): void {
    const existingSockets = this.socketState.get(userId) || [];

    const sockets = [...existingSockets, socket];

    this.socketState.set(userId, sockets);
  }

  remove(userId: number, socket: Socket): void {
    const existingSockets = this.socketState.get(userId);
    if (!existingSockets) return;

    const sockets = existingSockets.filter((s: Socket) => s.id !== socket.id);

    if (!sockets.length) this.socketState.delete(userId);
    else this.socketState.set(userId, sockets);
  }

  getByNamespace(userId: number, nsp: string): Socket[] {
    const existingSockets = this.socketState.get(userId) || [];
    return existingSockets.filter((socket: Socket) => socket.nsp.name === nsp);
  }

  sendMessage(userId: number, nsp: string, eventName: string, msg: any) {
    const addressat = this.getByNamespace(userId, nsp);
    addressat.forEach((socket: Socket) => socket.emit(eventName, msg));
  }
}
