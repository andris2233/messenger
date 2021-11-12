import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import AuthService from './auth.service';
import AuthController from './auth.controller';

import UserModule from '../user/user.module';
import { JWT_SECRET_KEY } from '../../config';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '15h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
