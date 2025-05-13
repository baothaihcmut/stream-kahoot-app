import { Room } from '../entities/room';

export const RoomRepositoryToken = Symbol('roomRepositoryToken');

export interface RoomRepository {
  createRoom(room: Room): Promise<void>;
  findRoomByHostIdAndCount(
    hostId: string,
    limit: number,
    skip: number,
  ): Promise<[Room[], number]>;
}
