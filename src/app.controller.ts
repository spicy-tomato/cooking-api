import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchDto } from './dto';
import { SearchResponseEntity } from './entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search')
  async search(@Query() searchDto: SearchDto): Promise<SearchResponseEntity> {
    return this.appService.search(searchDto);
  }
}
