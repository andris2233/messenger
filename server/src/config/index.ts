import * as prod from './optionsProduction';
import * as dev from './optionsDevelopment';

import { SequelizeModuleOptions } from '@nestjs/sequelize';

const NODE_ENV: string = process.env.NODE_ENV;

export const databaseConnectionOptions: SequelizeModuleOptions = NODE_ENV === 'prod' ? prod.dbOptions : dev.dbOptions;

export const JWT_SECRET_KEY: string = NODE_ENV === 'prod' ? prod.JWT_SECRET_KEY : dev.JWT_SECRET_KEY;
