import { EventsService } from './events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    findOne(id: string): Promise<{
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
        coverImageUrl: string | null;
        profileImageUrl: string | null;
    }>;
    getSchedule(eventId: string): Promise<{
        title: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startAt: Date;
        endAt: Date | null;
        isAllDay: boolean;
        sortOrder: number;
        address: string | null;
        phone: string | null;
        mapsUrl: string | null;
        eventId: string;
    }[]>;
    getMedia(eventId: string, filter?: string, user?: string, timeline?: string, order?: string, page?: string): Promise<{
        media: ({
            _count: {
                comments: number;
                likes: number;
            };
            comments: {
                id: string;
                createdAt: Date;
                text: string;
                authorName: string;
                clientId: string;
                mediaId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            eventId: string;
            type: import("@prisma/client").$Enums.MediaType;
            originalUrl: string;
            thumbnailUrl: string | null;
            mimeType: string;
            fileSize: number | null;
            width: number | null;
            height: number | null;
            uploaderName: string;
            uploaderClientId: string;
            exifTakenAt: Date | null;
            likesCount: number;
            downloadsCount: number;
            isApproved: boolean;
            isPrivateForOrganiser: boolean;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    getChat(eventId: string, limit?: string): Promise<{
        id: string;
        createdAt: Date;
        eventId: string;
        text: string;
        authorName: string;
        clientId: string;
    }[]>;
}
