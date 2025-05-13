import { randomUUID, UUID } from 'crypto';
import { RoomStatus } from '../enums/room_status';

export interface CreateRoomArg {
  title: string;
  description?: string;
  hostId: string;
  startedAt: Date;
  maxParticipant: number;
}

export class Room {
  id: UUID;
  title: string;
  description?: string;
  hostId: string;
  inviteToken: string;
  streamKey: string;
  createdAt: Date;
  startedAt: Date;
  status: RoomStatus;
  maxParticipant: number;

  constructor(args: CreateRoomArg) {
    this.id = randomUUID();
    this.title = args.title;
    this.description = args.description;
    this.hostId = this.hostId;
    this.streamKey = randomUUID().toString();
    this.inviteToken = randomUUID().toString();
    this.createdAt = new Date();
    this.startedAt = args.startedAt;
    this.status = RoomStatus.CREATED;
    this.maxParticipant = args.maxParticipant;
  }
}
