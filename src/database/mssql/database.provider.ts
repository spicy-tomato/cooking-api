import { Provider } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Account } from 'src/models/account/account.entity';
import { Country } from 'src/models/country/country.entity';
import { Image } from 'src/models/upload/entities/image.entity';

export const databaseProvider: Provider[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mssql',
        host: '',
        port: 1433,
        username: '',
        password: '',
        database: 'CookingApp',
        define: {
          freezeTableName: true,
          createdAt: false,
          updatedAt: false,
        },
      });

      sequelize.addModels([Country, Account, Image]);

      // await sequelize.sync();
      return sequelize;
    },
  },
];
