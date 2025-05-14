import { UUID } from 'crypto';
import { RoomParticipantOutput } from './room_participant.presenter';
import { RoomParticipant } from '../../domain/entities/room_participant';

export class CreateRoomParticipantInput {
  constructor(
    public userId: UUID,
    public roomId: UUID,
  ) {}
}

export class CreateRoomParticipantOutput extends RoomParticipantOutput {
  constructor(roomParticipan: RoomParticipant) {
    super(roomParticipan);
  }
}
