export class CreateMediaDto {
  type: 'PHOTO' | 'VIDEO';
  originalUrl: string;
  thumbnailUrl?: string;
  mimeType: string;
  fileSize?: number;
  width?: number;
  height?: number;
  uploaderName: string;
  uploaderClientId: string;
  exifTakenAt?: Date;
  isPrivateForOrganiser?: boolean;
}
