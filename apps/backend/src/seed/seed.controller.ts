import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('test-data')
  async seedTestData() {
    return this.seedService.seedTestData();
  }
}
