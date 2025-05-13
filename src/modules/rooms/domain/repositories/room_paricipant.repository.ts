import { RoomParticipant } from '../entities/room_participant';

export const RoomParicipantRepositoryToken = Symbol(
  'roomParicipantRepositoryToken',
);

export interface RoomParticipantRepository {
  createRoomParticipant(roomParticipant: RoomParticipant): Promise<void>;
}
