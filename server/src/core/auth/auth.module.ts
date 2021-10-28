import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from '../../config';

import AuthService from './auth.service';
import AuthController from './auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '15m',
      },
    }),
  ],
  exports: [
    AuthService,
  ]
})
export default class AuthModule {}
