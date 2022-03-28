import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/mssql/database.module';
import { UploadModule } from '../upload/upload.module';
import { FoodController } from './food.controller';
import { foodProvider } from './food.provider';
import { FoodService } from './food.service';

@Module({
  imports: [DatabaseModule, UploadModule],
  controllers: [FoodController],
  providers: [FoodService, ...foodProvider],
  exports: [FoodService],
})
export class FoodModule {}
