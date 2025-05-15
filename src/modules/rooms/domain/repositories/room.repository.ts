import { UUID } from 'crypto';
import { Room } from '../entities/room';

export const RoomRepositoryToken = Symbol('roomRepositoryToken');

export interface RoomRepository {
  createRoom(room: Room): Promise<void>;
  findRoomById(id: UUID): Promise<Room>;
  findRoomByHostIdAndCount(
    hostId: string,
    limit: number,
    skip: number,
  ): Promise<[Room[], number]>;
}
