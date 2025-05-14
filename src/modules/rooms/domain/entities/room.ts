import { randomUUID, UUID } from 'crypto';
import { RoomStatus } from '../enums/room_status';

export class Room {
  constructor(
    public id: UUID,
    public title: string,
    public hostId: UUID,
    public streamKey: string,
    public inviteToken: string,
    public createdAt: Date,
    public startedAt: Date,
    public status: RoomStatus,
    public maxParticipant: number,
    public description?: string,
  ) {}

  static newRoom(params: {
    title: string;
    description?: string;
    hostId: UUID;
    startedAt: Date;
    maxParticipant: number;
  }): Room {
    return new Room(
      randomUUID(),
      params.title,
      params.hostId,
      randomUUID().toString(),
      randomUUID().toString(),
      new Date(),
      params.startedAt,
      RoomStatus.CREATED,
      params.maxParticipant,
      params.description,
    );
  }
}
