import { Injectable } from '@nestjs/common';
import { Room as RoomDomain } from '../../domain/entities/room';
import { RoomRepository } from '../../domain/repositories/room.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RoomStatus as DomainRoomStatus } from '../../domain/enums/room_status';
import { RoomStatus as PrismaRoomStatus, Room } from 'generated/prisma-client';
import { UUID } from 'crypto';

@Injectable()
export class PrismaRoomRepository implements RoomRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findRoomByHostIdAndCount(
    hostId: string,
    limit: number,
    skip: number,
  ): Promise<[RoomDomain[], number]> {
    const [data, count] = await Promise.all([
      this.prismaService.room.findMany({
        where: {
          hostId: hostId,
        },
        skip: skip,
        take: limit,
      }),
      this.prismaService.room.count({
        where: {
          hostId: hostId,
        },
      }),
    ]);
    return [data.map(this.toRoomDomain), count];
  }

  private toRoomDomain(room: Room): RoomDomain {
    return new RoomDomain(
      room.id as UUID,
      room.title,
      room.hostId,
      room.streamKey,
      room.inviteToken,
      room.createdAt,
      room.startedAt,
      this.mapRoomStatusDomain(room.status),
      room.maxParticipant,
      room.description,
    );
  }

  private mapRoomStatusDomain(status: PrismaRoomStatus): DomainRoomStatus {
    switch (status) {
      case PrismaRoomStatus.CREATED:
        return DomainRoomStatus.CREATED;
      case PrismaRoomStatus.STARTED:
        return DomainRoomStatus.STARTED;
      default:
        throw new Error(`Unrecognized room status: ${status}`);
    }
  }
  private mapRoomStatus(status: DomainRoomStatus): PrismaRoomStatus {
    switch (status) {
      case DomainRoomStatus.CREATED:
        return PrismaRoomStatus.CREATED;
      case DomainRoomStatus.STARTED:
        return PrismaRoomStatus.STARTED;
      default:
        throw new Error(`Unrecognized room status: ${status}`);
    }
  }
  async createRoom(room: RoomDomain): Promise<void> {
    await this.prismaService.room.create({
      data: {
        id: room.id,
        title: room.title,
        description: room.description,
        hostId: room.hostId,
        inviteToken: room.inviteToken,
        streamKey: room.streamKey,
        createdAt: room.createdAt,
        startedAt: room.startedAt,
        status: this.mapRoomStatus(room.status),
        maxParticipant: room.maxParticipant,
      },
    });
  }
}
