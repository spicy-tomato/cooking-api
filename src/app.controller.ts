import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchResponseEntity } from './entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search')
  async search(@Query('q') q: string): Promise<SearchResponseEntity> {
    return this.appService.search(q);
  }
}
