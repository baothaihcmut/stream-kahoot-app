import { Inject, Injectable } from '@nestjs/common';
import {
  RoomRepository,
  RoomRepositoryToken,
} from '../../domain/repositories/room.repository';
import {
  CreateRoomInput,
  CreateRoomOutput,
} from '../presenters/create_room.presenter';

@Injectable()
export class RoomUseCase {
  constructor(@Inject(RoomRepositoryToken) roomRepo: RoomRepository) {}

  async createRoom(input: CreateRoomInput): Promise<CreateRoomOutput> {
    return null;
  }
}
