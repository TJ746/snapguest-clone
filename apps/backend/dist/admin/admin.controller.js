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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const create_event_dto_1 = require("../events/dto/create-event.dto");
const update_event_dto_1 = require("../events/dto/update-event.dto");
const create_schedule_item_dto_1 = require("./dto/create-schedule-item.dto");
const update_schedule_item_dto_1 = require("./dto/update-schedule-item.dto");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    getAllEvents() {
        const adminId = 'temp-admin-id';
        return this.adminService.getAllEvents(adminId);
    }
    createEvent(createEventDto) {
        const adminId = 'temp-admin-id';
        return this.adminService.createEvent(adminId, createEventDto);
    }
    getEvent(id) {
        return this.adminService.getEvent(id);
    }
    updateEvent(id, updateEventDto) {
        return this.adminService.updateEvent(id, updateEventDto);
    }
    deleteEvent(id) {
        return this.adminService.deleteEvent(id);
    }
    copyEvent(id, data) {
        return this.adminService.copyEvent(id, data.newStartDate);
    }
    getScheduleItems(eventId) {
        return this.adminService.getScheduleItems(eventId);
    }
    createScheduleItem(eventId, createScheduleItemDto) {
        return this.adminService.createScheduleItem(eventId, createScheduleItemDto);
    }
    updateScheduleItem(id, updateScheduleItemDto) {
        return this.adminService.updateScheduleItem(id, updateScheduleItemDto);
    }
    deleteScheduleItem(id) {
        return this.adminService.deleteScheduleItem(id);
    }
    reorderScheduleItem(id, data) {
        return this.adminService.reorderScheduleItem(id, data.sortOrder);
    }
    getEventMedia(eventId) {
        return this.adminService.getEventMedia(eventId);
    }
    deleteMedia(id) {
        return this.adminService.deleteMedia(id);
    }
    exportMedia(eventId, data) {
        return this.adminService.exportMedia(eventId, data.size);
    }
    exportPDF(eventId, data) {
        return this.adminService.exportPDF(eventId, data.customDescription);
    }
    exportQR(eventId, data) {
        return this.adminService.exportQR(eventId, data);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllEvents", null);
__decorate([
    (0, common_1.Post)('events'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Get)('events/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getEvent", null);
__decorate([
    (0, common_1.Patch)('events/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_dto_1.UpdateEventDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateEvent", null);
__decorate([
    (0, common_1.Delete)('events/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteEvent", null);
__decorate([
    (0, common_1.Post)('events/:id/copy'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "copyEvent", null);
__decorate([
    (0, common_1.Get)('events/:id/schedule'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getScheduleItems", null);
__decorate([
    (0, common_1.Post)('events/:id/schedule'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_schedule_item_dto_1.CreateScheduleItemDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createScheduleItem", null);
__decorate([
    (0, common_1.Patch)('schedule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_schedule_item_dto_1.UpdateScheduleItemDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateScheduleItem", null);
__decorate([
    (0, common_1.Delete)('schedule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteScheduleItem", null);
__decorate([
    (0, common_1.Patch)('schedule/:id/reorder'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "reorderScheduleItem", null);
__decorate([
    (0, common_1.Get)('events/:id/media'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getEventMedia", null);
__decorate([
    (0, common_1.Delete)('media/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteMedia", null);
__decorate([
    (0, common_1.Post)('events/:id/export/media'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "exportMedia", null);
__decorate([
    (0, common_1.Post)('events/:id/export/pdf'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "exportPDF", null);
__decorate([
    (0, common_1.Post)('events/:id/export/qr'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "exportQR", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map