import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e) {
      // Allow app to boot even if DB is not reachable yet
      console.warn('[Prisma] Database connection failed on startup:', e);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
