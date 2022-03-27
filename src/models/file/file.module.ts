import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/mssql/database.module';
import { FileController } from './file.controller';
import { fileProvider } from './file.provider';
import { FileService } from './file.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FileController],
  providers: [FileService, ...fileProvider],
})
export class FileModule {}
