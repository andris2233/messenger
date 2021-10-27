import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConnectionOptions } from './config';

import { UserModule } from './core/user/user.module';
import AuthModule from './core/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConnectionOptions),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
