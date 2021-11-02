import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import AuthService from './auth.service';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    if (!headers.authorization) return false;

    return await this.authService.verify(headers.authorization);
  }
}
