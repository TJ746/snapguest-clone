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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllEvents(adminId) {
        return this.prisma.event.findMany({
            where: { adminId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: {
                        media: true,
                        chatMessages: true,
                        scheduleItems: true,
                    },
                },
            },
        });
    }
    async createEvent(adminId, createEventDto) {
        const joinCode = this.generateJoinCode();
        return this.prisma.event.create({
            data: {
                ...createEventDto,
                adminId,
                joinCode,
            },
        });
    }
    async getEvent(id) {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: {
                scheduleItems: {
                    orderBy: [{ startAt: 'asc' }, { sortOrder: 'asc' }],
                },
                _count: {
                    select: {
                        media: true,
                        chatMessages: true,
                    },
                },
            },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
    async updateEvent(id, updateEventDto) {
        return this.prisma.event.update({
            where: { id },
            data: updateEventDto,
        });
    }
    async deleteEvent(id) {
        return this.prisma.event.delete({
            where: { id },
        });
    }
    async copyEvent(id, newStartDate) {
        const originalEvent = await this.prisma.event.findUnique({
            where: { id },
            include: {
                scheduleItems: true,
            },
        });
        if (!originalEvent) {
            throw new common_1.NotFoundException('Event not found');
        }
        const { id: originalId, createdAt, updatedAt, joinCode, scheduleItems, ...eventData } = originalEvent;
        const newJoinCode = this.generateJoinCode();
        let dateOffset = 0;
        if (newStartDate && originalEvent.startsAt) {
            dateOffset = newStartDate.getTime() - originalEvent.startsAt.getTime();
        }
        const newEvent = await this.prisma.event.create({
            data: {
                ...eventData,
                joinCode: newJoinCode,
                startsAt: newStartDate || eventData.startsAt,
                endsAt: eventData.endsAt && dateOffset
                    ? new Date(eventData.endsAt.getTime() + dateOffset)
                    : eventData.endsAt,
            },
        });
        if (originalEvent.scheduleItems.length > 0) {
            const scheduleItemsData = originalEvent.scheduleItems.map(item => {
                const { id, createdAt, updatedAt, eventId, ...itemData } = item;
                return {
                    ...itemData,
                    eventId: newEvent.id,
                    startAt: dateOffset ? new Date(item.startAt.getTime() + dateOffset) : item.startAt,
                    endAt: item.endAt && dateOffset
                        ? new Date(item.endAt.getTime() + dateOffset)
                        : item.endAt,
                };
            });
            await this.prisma.scheduleItem.createMany({
                data: scheduleItemsData,
            });
        }
        return newEvent;
    }
    async getScheduleItems(eventId) {
        return this.prisma.scheduleItem.findMany({
            where: { eventId },
            orderBy: [{ startAt: 'asc' }, { sortOrder: 'asc' }],
        });
    }
    async createScheduleItem(eventId, createScheduleItemDto) {
        return this.prisma.scheduleItem.create({
            data: {
                ...createScheduleItemDto,
                eventId,
            },
        });
    }
    async updateScheduleItem(id, updateScheduleItemDto) {
        return this.prisma.scheduleItem.update({
            where: { id },
            data: updateScheduleItemDto,
        });
    }
    async deleteScheduleItem(id) {
        return this.prisma.scheduleItem.delete({
            where: { id },
        });
    }
    async reorderScheduleItem(id, sortOrder) {
        return this.prisma.scheduleItem.update({
            where: { id },
            data: { sortOrder },
        });
    }
    async getEventMedia(eventId) {
        return this.prisma.media.findMany({
            where: { eventId },
            orderBy: { createdAt: 'desc' },
            include: {
                comments: true,
                _count: {
                    select: { likes: true, comments: true },
                },
            },
        });
    }
    async deleteMedia(id) {
        return this.prisma.media.delete({
            where: { id },
        });
    }
    async exportMedia(eventId, size) {
        const media = await this.prisma.media.findMany({
            where: { eventId },
            select: {
                originalUrl: true,
                thumbnailUrl: true,
                uploaderName: true,
                createdAt: true,
            },
        });
        return {
            message: `Export initiated for ${media.length} files in ${size} size`,
            downloadUrl: 'https://example.com/download/export.zip',
        };
    }
    async exportPDF(eventId, customDescription) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        return {
            message: 'PDF invitation generated',
            downloadUrl: 'https://example.com/download/invitation.pdf',
        };
    }
    async exportQR(eventId, options) {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        const qrUrl = `https://your-domain.com/de_CH/by-id/${eventId}`;
        return {
            message: 'QR code generated',
            downloadUrl: 'https://example.com/download/qr-code.svg',
            qrUrl,
        };
    }
    generateJoinCode() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map