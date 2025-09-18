import { PrismaService } from '../prisma/prisma.service';
export declare class SeedService {
    private prisma;
    constructor(prisma: PrismaService);
    seedTestData(): Promise<{
        admin: {
            id: string;
            email: string | null;
            createdAt: Date;
            updatedAt: Date;
            displayName: string;
            avatarUrl: string | null;
            isAdmin: boolean;
            passwordHash: string | null;
        };
        event: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            joinCode: string | null;
            title: string;
            description: string | null;
            startsAt: Date | null;
            endsAt: Date | null;
            expiresAt: Date | null;
            language: string;
            isPrivate: boolean;
            hasTimeline: boolean;
            hasChat: boolean;
            coverImageUrl: string | null;
            coverTemplate: string | null;
            profileImageUrl: string | null;
            instagramUrl: string | null;
            tiktokUrl: string | null;
            whatsappUrl: string | null;
            websiteUrl: string | null;
            adminId: string;
        };
        scheduleItems: number;
        media: number;
        messages: number;
    }>;
}
