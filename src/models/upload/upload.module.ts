import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/mssql/database.module';
import { UploadController } from './upload.controller';
import { uploadProvider } from './upload.provider';
import { UploadService } from './upload.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UploadController],
  providers: [UploadService, ...uploadProvider],
})
export class UploadModule {}
