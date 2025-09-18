"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScheduleItemDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_schedule_item_dto_1 = require("./create-schedule-item.dto");
class UpdateScheduleItemDto extends (0, mapped_types_1.PartialType)(create_schedule_item_dto_1.CreateScheduleItemDto) {
}
exports.UpdateScheduleItemDto = UpdateScheduleItemDto;
//# sourceMappingURL=update-schedule-item.dto.js.map