import { SeedService } from './seed.service';
export declare class SeedController {
    private readonly seedService;
    constructor(seedService: SeedService);
    seedTestData(): Promise<{
        admin: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            displayName: string;
            avatarUrl: string | null;
            isAdmin: boolean;
            passwordHash: string | null;
        };
        event: {
            title: string;
            description: string | null;
            startsAt: Date | null;
            endsAt: Date | null;
            language: string;
            hasTimeline: boolean;
            hasChat: boolean;
            coverTemplate: string | null;
            instagramUrl: string | null;
            tiktokUrl: string | null;
            whatsappUrl: string | null;
            websiteUrl: string | null;
            id: string;
            joinCode: string | null;
            createdAt: Date;
            updatedAt: Date;
            expiresAt: Date | null;
            isPrivate: boolean;
            coverImageUrl: string | null;
            profileImageUrl: string | null;
            adminId: string;
        };
        scheduleItems: number;
        media: number;
        messages: number;
    }>;
}
