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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EventsService = class EventsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOneForGuest(id) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                startsAt: true,
                endsAt: true,
                language: true,
                hasTimeline: true,
                hasChat: true,
                coverImageUrl: true,
                coverTemplate: true,
                profileImageUrl: true,
                instagramUrl: true,
                tiktokUrl: true,
                whatsappUrl: true,
                websiteUrl: true,
            },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
    async getSchedule(eventId) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            select: { hasTimeline: true },
        });
        if (!event?.hasTimeline) {
            return [];
        }
        return this.prisma.scheduleItem.findMany({
            where: { eventId },
            orderBy: [{ startAt: 'asc' }, { sortOrder: 'asc' }],
        });
    }
    async getMedia(eventId, options) {
        const { filter, user, timeline, order, page = 1 } = options;
        const limit = 20;
        const skip = (page - 1) * limit;
        let where = { eventId, isApproved: true };
        if (user) {
            where.uploaderName = { contains: user, mode: 'insensitive' };
        }
        if (timeline) {
        }
        let orderBy = { createdAt: 'desc' };
        if (order === 'likes') {
            orderBy = { likesCount: 'desc' };
        }
        else if (order === 'downloads') {
            orderBy = { downloadsCount: 'desc' };
        }
        else if (order === 'date_asc') {
            orderBy = { createdAt: 'asc' };
        }
        const [media, total] = await Promise.all([
            this.prisma.media.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: {
                    comments: {
                        orderBy: { createdAt: 'desc' },
                        take: 3,
                    },
                    _count: {
                        select: { comments: true, likes: true },
                    },
                },
            }),
            this.prisma.media.count({ where }),
        ]);
        return {
            media,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async getChat(eventId, limit = 50) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            select: { hasChat: true },
        });
        if (!event?.hasChat) {
            return [];
        }
        return this.prisma.chatMessage.findMany({
            where: { eventId },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map