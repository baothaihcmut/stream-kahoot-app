import { Room } from '../entities/room';

export const RoomRepositoryToken = Symbol('roomRepositoryToken');

export interface RoomRepository {
  createRoom(room: Room): Promise<void>;
}
