import { RoomOutput } from './room.presenter';
import { AutoMap } from '@automapper/classes';
import { Room } from '../../domain/entities/room';
import { PaginationOutput } from 'src/common/output/pagination.output';

export class GetHostRoomInput {
  offset: number;
  limit: number;
}

export class GetHostRoomOutput {
  @AutoMap(() => [RoomOutput])
  rooms: RoomOutput[];

  @AutoMap(() => PaginationOutput)
  pagination: PaginationOutput;

  constructor(rooms: Room[], pagination: PaginationOutput) {
    this.rooms = rooms.map((room) => new RoomOutput(room));
    this.pagination = pagination;
  }
}
