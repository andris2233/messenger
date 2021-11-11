import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import AuthService from './auth.service';

@Injectable()
export default class WsGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data = context.switchToWs().getData();
    if (typeof data !== 'object' || !('accessToken' in data)) return false;
    if (!('msg' in data) || typeof data.msg !== 'object') return false;

    return await this.authService.verify(data.accessToken);
  }
}
