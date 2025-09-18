import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async seedTestData() {
    try {
      // Create admin user
      const admin = await this.prisma.user.upsert({
        where: { email: 'admin@snapguest.ch' },
        update: {},
        create: {
          email: 'admin@snapguest.ch',
          displayName: 'Admin User',
          isAdmin: true,
          passwordHash: 'hashed-password-placeholder',
        },
      });

      // Create test event
      const event = await this.prisma.event.upsert({
        where: { id: 'testevent' },
        update: {},
        create: {
          id: 'testevent',
          title: 'Hochzeit Sommerfest Anna & Flo',
          description: `Wir freuen uns sehr auf den Tag mit euch! Informiert euch gerne hier über den detaillierten Tagesablauf, tauscht euch aus im Chat, stellt Fragen und teilt Fotos.

Umgeben von der atemberaubenden Schönheit der Berge wollen wir unsere Liebe besiegeln und mit euch feiern. 💕`,
          startsAt: new Date('2025-08-08T09:00:00Z'),
          endsAt: new Date('2025-08-08T23:00:00Z'),
          language: 'de_CH',
          hasTimeline: true,
          hasChat: true,
          coverImageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=400&fit=crop',
          profileImageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=200&h=200&fit=crop&crop=faces',
          instagramUrl: 'https://instagram.com/annaflo2025',
          websiteUrl: 'https://snapguest.ch',
          joinCode: 'WEDDING2025',
          adminId: admin.id,
        },
      });

      // Create schedule items
      const scheduleItems = [
        {
          title: 'Ankunft der Standesamt-Gäste',
          description: 'Wir treffen uns in Hemishofen bei den Eltern von Anna und laufen dann gemeinsam an den Rhein.',
          startAt: new Date('2025-08-08T09:45:00Z'),
          endAt: new Date('2025-08-08T10:00:00Z'),
          address: 'Hemishofen, Schweiz',
          mapsUrl: 'https://maps.google.com/?q=Hemishofen',
          sortOrder: 1,
        },
        {
          title: 'Bootsfahrt nach Stein am Rhein',
          description: 'Alle Standesamt-Gäste fahren gemeinsam mit 2 Booten von Hemishofen den Rhein hoch nach Stein am Rhein, wo die Trauung stattfindet.',
          startAt: new Date('2025-08-08T10:00:00Z'),
          endAt: new Date('2025-08-08T10:45:00Z'),
          sortOrder: 2,
        },
        {
          title: 'Standesamtliche Trauung',
          description: 'Wir werden im historischen Rathaus von Stein am Rhein standesamtlich getraut. Nach der Trauung freuen wir uns auf gemeinsame Fotos vor dem Standesamt.',
          startAt: new Date('2025-08-08T11:15:00Z'),
          endAt: new Date('2025-08-08T12:00:00Z'),
          address: 'Rathaus Stein am Rhein',
          mapsUrl: 'https://maps.google.com/?q=Rathaus+Stein+am+Rhein',
          sortOrder: 3,
        },
        {
          title: 'Bootsfahrt nach Hemishofen',
          description: 'Stromabwärts geht es für die Standesamt-Gäste wieder zurück von Stein am Rhein nach Hemishofen.',
          startAt: new Date('2025-08-08T12:00:00Z'),
          endAt: new Date('2025-08-08T12:20:00Z'),
          sortOrder: 4,
        },
        {
          title: 'Ankunft der Sommerfest-Gäste',
          description: 'Die restlichen Gäste sind um 12:15 Uhr herzlich willkommen auf der Radwiese in Hemishofen. Die Parksituation ist auf einem separaten Blatt beschrieben.',
          startAt: new Date('2025-08-08T12:15:00Z'),
          sortOrder: 5,
        },
      ];

      for (let i = 0; i < scheduleItems.length; i++) {
        const item = scheduleItems[i];
        await this.prisma.scheduleItem.upsert({
          where: { id: `schedule-item-${i + 1}` },
          update: {},
          create: {
            id: `schedule-item-${i + 1}`,
            ...item,
            eventId: event.id,
          },
        });
      }

      // Create some test media
      const testMedia = [
        {
          type: 'PHOTO' as const,
          originalUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
          thumbnailUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&h=300&fit=crop',
          uploaderName: 'Anna',
          uploaderClientId: 'test-client-1',
          mimeType: 'image/jpeg',
          likesCount: 5,
          downloadsCount: 2,
        },
        {
          type: 'PHOTO' as const,
          originalUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
          thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&h=300&fit=crop',
          uploaderName: 'Flo',
          uploaderClientId: 'test-client-2',
          mimeType: 'image/jpeg',
          likesCount: 3,
          downloadsCount: 1,
        },
        {
          type: 'PHOTO' as const,
          originalUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
          thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=300&fit=crop',
          uploaderName: 'Maria',
          uploaderClientId: 'test-client-3',
          mimeType: 'image/jpeg',
          likesCount: 8,
          downloadsCount: 4,
        },
      ];

      for (let i = 0; i < testMedia.length; i++) {
        const media = testMedia[i];
        await this.prisma.media.upsert({
          where: { id: `test-media-${i + 1}` },
          update: {},
          create: {
            id: `test-media-${i + 1}`,
            ...media,
            eventId: event.id,
          },
        });
      }

      // Create some test chat messages
      const testMessages = [
        {
          text: 'Freue mich riesig auf euren großen Tag! 🎉',
          authorName: 'Maria',
          clientId: 'test-client-3',
        },
        {
          text: 'Wird bestimmt ein wunderschönes Fest! ❤️',
          authorName: 'Thomas',
          clientId: 'test-client-4',
        },
        {
          text: 'Danke euch allen! Wir können es kaum erwarten 😊',
          authorName: 'Anna',
          clientId: 'test-client-1',
        },
      ];

      for (let i = 0; i < testMessages.length; i++) {
        const message = testMessages[i];
        await this.prisma.chatMessage.upsert({
          where: { id: `test-message-${i + 1}` },
          update: {},
          create: {
            id: `test-message-${i + 1}`,
            ...message,
            eventId: event.id,
          },
        });
      }

      console.log('✅ Test data seeded successfully!');
      return {
        admin,
        event,
        scheduleItems: scheduleItems.length,
        media: testMedia.length,
        messages: testMessages.length,
      };
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      throw error;
    }
  }
}
