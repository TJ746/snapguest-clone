"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MediaService = class MediaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMedia(eventId, createMediaDto) {
        return this.prisma.media.create({
            data: {
                ...createMediaDto,
                eventId,
            },
        });
    }
    async getUploadUrl(eventId, data) {
        const { fileName, fileType, clientId } = data;
        const timestamp = Date.now();
        const filePath = `events/${eventId}/media/${timestamp}-${fileName}`;
        return {
            uploadUrl: `https://supabase-placeholder.com/upload/${filePath}`,
            publicUrl: `https://supabase-placeholder.com/storage/${filePath}`,
            filePath,
            expiresIn: 3600,
        };
    }
    async toggleLike(mediaId, clientId) {
        const existingLike = await this.prisma.mediaLike.findUnique({
            where: {
                mediaId_clientId: {
                    mediaId,
                    clientId,
                },
            },
        });
        if (existingLike) {
            await this.prisma.mediaLike.delete({
                where: { id: existingLike.id },
            });
            await this.prisma.media.update({
                where: { id: mediaId },
                data: { likesCount: { decrement: 1 } },
            });
            return { liked: false };
        }
        else {
            await this.prisma.mediaLike.create({
                data: { mediaId, clientId },
            });
            await this.prisma.media.update({
                where: { id: mediaId },
                data: { likesCount: { increment: 1 } },
            });
            return { liked: true };
        }
    }
    async addComment(mediaId, createCommentDto) {
        return this.prisma.mediaComment.create({
            data: {
                ...createCommentDto,
                mediaId,
            },
        });
    }
    async incrementDownload(mediaId) {
        await this.prisma.media.update({
            where: { id: mediaId },
            data: { downloadsCount: { increment: 1 } },
        });
        const media = await this.prisma.media.findUnique({
            where: { id: mediaId },
            select: { originalUrl: true },
        });
        return { downloadUrl: media?.originalUrl };
    }
    async deleteMedia(mediaId, clientId) {
        const media = await this.prisma.media.findUnique({
            where: { id: mediaId },
        });
        if (!media) {
            throw new common_1.NotFoundException('Media not found');
        }
        if (media.uploaderClientId !== clientId) {
            throw new common_1.ForbiddenException('You can only delete your own uploads');
        }
        return this.prisma.media.delete({
            where: { id: mediaId },
        });
    }
    async findOne(mediaId) {
        const media = await this.prisma.media.findUnique({
            where: { id: mediaId },
            include: {
                comments: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
                _count: {
                    select: { likes: true, comments: true },
                },
            },
        });
        if (!media) {
            throw new common_1.NotFoundException('Media not found');
        }
        return media;
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MediaService);
//# sourceMappingURL=media.service.js.map