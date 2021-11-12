import { INestApplication } from '@nestjs/common';

import SocketAdapter from './socket.adapter';
import SocketService from './socket.service';
import AuthService from 'src/core/auth/auth.service';

export const initAdapters = (app: INestApplication): void => {
  const socketStateService = app.get(SocketService);
  const authService = app.get(AuthService);

  app.useWebSocketAdapter(new SocketAdapter(app, socketStateService, authService));
};
