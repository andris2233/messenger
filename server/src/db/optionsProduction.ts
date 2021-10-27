import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const options: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'postgres',
  models: [],
  autoLoadModels: true,
};
// test
