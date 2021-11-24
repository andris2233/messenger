import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import AuthService from './auth.service';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    if (!headers.authorization) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    const verified = await this.authService.verify(headers.authorization);
    if (!verified) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return true;
  }
}
