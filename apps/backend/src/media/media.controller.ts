import { Controller, Post, Body, Param, Delete, Patch, Get, Query } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { CreateMediaCommentDto } from './dto/create-media-comment.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // Upload media files
  @Post('upload/:eventId')
  uploadMedia(@Param('eventId') eventId: string, @Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.createMedia(eventId, createMediaDto);
  }

  // Get presigned upload URL
  @Post('upload-url/:eventId')
  getUploadUrl(
    @Param('eventId') eventId: string,
    @Body() data: { fileName: string; fileType: string; clientId: string }
  ) {
    return this.mediaService.getUploadUrl(eventId, data);
  }

  // Like/unlike media
  @Post(':id/like')
  likeMedia(@Param('id') mediaId: string, @Body() data: { clientId: string }) {
    return this.mediaService.toggleLike(mediaId, data.clientId);
  }

  // Add comment
  @Post(':id/comment')
  addComment(@Param('id') mediaId: string, @Body() createCommentDto: CreateMediaCommentDto) {
    return this.mediaService.addComment(mediaId, createCommentDto);
  }

  // Download media (increment counter)
  @Post(':id/download')
  downloadMedia(@Param('id') mediaId: string) {
    return this.mediaService.incrementDownload(mediaId);
  }

  // Delete media (owner only)
  @Delete(':id')
  deleteMedia(@Param('id') mediaId: string, @Body() data: { clientId: string }) {
    return this.mediaService.deleteMedia(mediaId, data.clientId);
  }

  // Get media details
  @Get(':id')
  getMedia(@Param('id') mediaId: string) {
    return this.mediaService.findOne(mediaId);
  }
}
