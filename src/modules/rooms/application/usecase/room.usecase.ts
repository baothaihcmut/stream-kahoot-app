import { Inject, Injectable } from '@nestjs/common';
import {
  RoomRepository,
  RoomRepositoryToken,
} from '../../domain/repositories/room.repository';
import {
  CreateRoomInput,
  CreateRoomOutput,
} from '../presenters/create_room.presenter';
import {
  ContextService,
  USER_CONTEXT_KEY,
} from 'src/common/context/context.service';
import { UserContext } from 'src/common/context/user.context';
import { Room } from '../../domain/entities/room';
import {
  GetHostRoomInput,
  GetHostRoomOutput,
} from '../presenters/get_host_room.presenter';
import { PaginationOutput } from 'src/common/output/pagination.output';

@Injectable()
export class RoomUseCase {
  constructor(
    @Inject(RoomRepositoryToken) private readonly roomRepo: RoomRepository,
    private readonly contextService: ContextService,
  ) {}

  async createRoom(input: CreateRoomInput): Promise<CreateRoomOutput> {
    const userContext = this.contextService.get<UserContext>(USER_CONTEXT_KEY);
    const room = Room.newRoom({
      title: input.title,
      description: input.description,
      startedAt: input.startedAt,
      maxParticipant: input.maxParticipant,
      hostId: userContext.userId,
    });
    await this.roomRepo.createRoom(room);
    return new CreateRoomOutput(room);
  }

  async getHostRoom(input: GetHostRoomInput): Promise<GetHostRoomOutput> {
    const userContext = this.contextService.get<UserContext>(USER_CONTEXT_KEY);
    const [data, count] = await this.roomRepo.findRoomByHostIdAndCount(
      userContext.userId,
      input.pagination.limit,
      input.pagination.skip,
    );
    return new GetHostRoomOutput(
      data,
      PaginationOutput.from(
        count,
        input.pagination.skip,
        input.pagination.limit,
      ),
    );
  }
}
