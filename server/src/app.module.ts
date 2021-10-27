import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConnectionOptions } from './db';

import { UserModule } from './core/user/user.module';

@Module({
  imports: [SequelizeModule.forRoot(databaseConnectionOptions), UserModule],
})
export class AppModule {}
