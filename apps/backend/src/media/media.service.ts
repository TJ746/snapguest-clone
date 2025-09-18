import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { CreateMediaCommentDto } from './dto/create-media-comment.dto';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async createMedia(eventId: string, createMediaDto: CreateMediaDto) {
    return this.prisma.media.create({
      data: {
        ...createMediaDto,
        eventId,
      },
    });
  }

  async getUploadUrl(eventId: string, data: { fileName: string; fileType: string; clientId: string }) {
    // TODO: Implement Supabase Storage presigned URL generation
    const { fileName, fileType, clientId } = data;
    
    // Generate unique file path
    const timestamp = Date.now();
    const filePath = `events/${eventId}/media/${timestamp}-${fileName}`;
    
    // Placeholder for actual Supabase integration
    return {
      uploadUrl: `https://supabase-placeholder.com/upload/${filePath}`,
      publicUrl: `https://supabase-placeholder.com/storage/${filePath}`,
      filePath,
      expiresIn: 3600, // 1 hour
    };
  }

  async toggleLike(mediaId: string, clientId: string) {
    const existingLike = await this.prisma.mediaLike.findUnique({
      where: {
        mediaId_clientId: {
          mediaId,
          clientId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await this.prisma.mediaLike.delete({
        where: { id: existingLike.id },
      });
      
      await this.prisma.media.update({
        where: { id: mediaId },
        data: { likesCount: { decrement: 1 } },
      });

      return { liked: false };
    } else {
      // Like
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

  async addComment(mediaId: string, createCommentDto: CreateMediaCommentDto) {
    return this.prisma.mediaComment.create({
      data: {
        ...createCommentDto,
        mediaId,
      },
    });
  }

  async incrementDownload(mediaId: string) {
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

  async deleteMedia(mediaId: string, clientId: string) {
    const media = await this.prisma.media.findUnique({
      where: { id: mediaId },
    });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    // Only owner can delete (or admin, but that's handled in admin controller)
    if (media.uploaderClientId !== clientId) {
      throw new ForbiddenException('You can only delete your own uploads');
    }

    return this.prisma.media.delete({
      where: { id: mediaId },
    });
  }

  async findOne(mediaId: string) {
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
      throw new NotFoundException('Media not found');
    }

    return media;
  }
}
