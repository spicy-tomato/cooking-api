import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Account } from 'src/models/account/account.entity';
import { Country } from 'src/models/country/country.entity';

export const databaseProvider: Provider[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mssql',
        host: '14.225.255.234',
        port: 1433,
        username: 'btl_mobile_login',
        password: 'sqlserver@Mobile-2',
        database: 'CookingApp',
        define: {
          freezeTableName: true,
          createdAt: false,
          updatedAt: false,
        },
      });

      sequelize.addModels([Country, Account]);

      // await sequelize.sync();
      return sequelize;
    },
  },
];
