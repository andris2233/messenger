import { options as optionsProduction } from './optionsProduction';
import { options as optionsDevelopment } from './optionsDevelopment';

import { SequelizeModuleOptions } from '@nestjs/sequelize';

const NODE_ENV: string = process.env.NODE_ENV;

export const databaseConnectionOptions: SequelizeModuleOptions =
  NODE_ENV === 'prod' ? optionsProduction : optionsDevelopment;
