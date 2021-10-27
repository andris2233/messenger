import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConnectionOptions } from './db';

@Module({
  imports: [SequelizeModule.forRoot(databaseConnectionOptions)],
})
export class AppModule {}
