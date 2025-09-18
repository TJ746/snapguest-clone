import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health.controller';
import { EventsModule } from './events/events.module';
import { AdminModule } from './admin/admin.module';
import { MediaModule } from './media/media.module';
import { ChatModule } from './chat/chat.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [PrismaModule, EventsModule, AdminModule, MediaModule, ChatModule, SeedModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
