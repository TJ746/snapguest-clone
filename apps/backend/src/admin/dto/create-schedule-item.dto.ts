export class CreateScheduleItemDto {
  title: string;
  description?: string;
  startAt: Date;
  endAt?: Date;
  isAllDay?: boolean;
  sortOrder?: number;
  address?: string;
  phone?: string;
  mapsUrl?: string;
}
