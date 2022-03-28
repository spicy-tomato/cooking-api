import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Account } from 'src/models/account/account.entity';
import { Country } from 'src/models/country/country.entity';
import { File } from 'src/models/file/entities';
import { Food } from 'src/models/food/entities/food.entity';
import { StepDetails } from 'src/models/food/entities/step-details.entity';

export const databaseProvider: Provider[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mssql',
        host: process.env.DATABASE_HOST,
        port: 1433,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: 'CookingApp',
        define: {
          freezeTableName: true,
          createdAt: false,
          updatedAt: false,
        },
      });

      sequelize.addModels([Country, Account, File, Food, StepDetails]);

      // await sequelize.sync();
      return sequelize;
    },
  },
];
