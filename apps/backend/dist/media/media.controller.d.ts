import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { CreateMediaCommentDto } from './dto/create-media-comment.dto';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    uploadMedia(eventId: string, createMediaDto: CreateMediaDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
        eventId: string;
    }>;
    getUploadUrl(eventId: string, data: {
        fileName: string;
        fileType: string;
        clientId: string;
    }): Promise<{
        uploadUrl: string;
        publicUrl: string;
        filePath: string;
        expiresIn: number;
    }>;
    likeMedia(mediaId: string, data: {
        clientId: string;
    }): Promise<{
        liked: boolean;
    }>;
    addComment(mediaId: string, createCommentDto: CreateMediaCommentDto): Promise<{
        id: string;
        createdAt: Date;
        text: string;
        authorName: string;
        clientId: string;
        mediaId: string;
    }>;
    downloadMedia(mediaId: string): Promise<{
        downloadUrl: string | undefined;
    }>;
    deleteMedia(mediaId: string, data: {
        clientId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
        eventId: string;
    }>;
    getMedia(mediaId: string): Promise<{
        comments: {
            id: string;
            createdAt: Date;
            text: string;
            authorName: string;
            clientId: string;
            mediaId: string;
        }[];
        _count: {
            comments: number;
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
        eventId: string;
    }>;
}
