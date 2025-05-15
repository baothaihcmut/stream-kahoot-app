import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RoomParticipantRepository } from '../../domain/repositories/room_paricipant.repository';
import { UUID } from 'crypto';
import { RoomParticipant as RoomParticipantDomain } from '../../domain/entities/room_participant';
import { RoomParticipant as RoomParticipantPrisma } from 'generated/prisma-client';

@Injectable()
export class PrismaRoomParticipantRepository
  implements RoomParticipantRepository
{
  constructor(private readonly prismaService: PrismaService) {}
  async createRoomParticipant(
    roomParticipant: RoomParticipantDomain,
  ): Promise<void> {
    await this.prismaService.roomParticipant.create({
      data: {
        isJoin: roomParticipant.isJoin,
        joinedAt: roomParticipant.joinedAt,
        leaveAt: roomParticipant.leaveAt,
        user: {
          connect: {
            id: roomParticipant.userId,
          },
        },
        room: {
          connect: {
            id: roomParticipant.roomId,
          },
        },
      },
    });
  }

  toRoomParticipantDomain(
    roomParticipant: RoomParticipantPrisma,
  ): RoomParticipantDomain {
    return new RoomParticipantDomain(
      roomParticipant.userId as UUID,
      roomParticipant.roomId as UUID,
      roomParticipant.isJoin,
      roomParticipant.joinedAt,
      roomParticipant.leaveAt,
    );
  }

  async findRoomParticipantByRoomIdAndUserId(
    userId: UUID,
    roomId: UUID,
  ): Promise<RoomParticipantDomain> {
    const result = await this.prismaService.roomParticipant.findFirst({
      where: {
        roomId: roomId,
        userId: userId,
      },
    });
    return result ? this.toRoomParticipantDomain(result) : null;
  }
}
