import { Inject, Injectable } from '@nestjs/common';
import {
  RoomParicipantRepositoryToken,
  RoomParticipantRepository,
} from '../../domain/repositories/room_paricipant.repository';
import {
  CreateRoomParticipantInput,
  CreateRoomParticipantOutput,
} from '../presenters/create_room_participant.presenter';
import {
  RoomRepository,
  RoomRepositoryToken,
} from '../../domain/repositories/room.repository';
import { AppException, ErrorCode } from 'src/common/exception/app.exception';
import {
  ContextService,
  USER_CONTEXT_KEY,
} from 'src/common/context/context.service';
import { UserContext } from 'src/common/context/user.context';
import { RoomParticipant } from '../../domain/entities/room_participant';
import {
  UserRepository,
  UserRepositoryToken,
} from 'src/modules/users/domain/repositories/user.repository';

@Injectable()
export class RoomParticipantUseCase {
  constructor(
    @Inject(RoomParicipantRepositoryToken)
    private readonly roomParticipantRepo: RoomParticipantRepository,
    @Inject(RoomRepositoryToken)
    private readonly roomRepo: RoomRepository,
    @Inject(UserRepositoryToken)
    private readonly userRepo: UserRepository,
    private readonly contextService: ContextService,
  ) {}
  async createRoomParticipant(
    input: CreateRoomParticipantInput,
  ): Promise<CreateRoomParticipantOutput> {
    const userContext = this.contextService.get<UserContext>(USER_CONTEXT_KEY);
    const [room, roomParticipantExist, user] = await Promise.all([
      this.roomRepo.findRoomById(input.roomId),
      this.roomParticipantRepo.findRoomParticipantByRoomIdAndUserId(
        input.userId,
        input.roomId,
      ),
      this.userRepo.findUserById(input.userId),
    ]);
    if (!room) {
      throw new AppException(ErrorCode.ROOM_NOT_FOUND);
    }
    if (!user) {
      throw new AppException(ErrorCode.USER_NOT_FOUND);
    }
    if (room.hostId != userContext.userId) {
      throw new AppException(ErrorCode.USER_IS_NOT_ROOM_HOST);
    }
    if (roomParticipantExist) {
      throw new AppException(ErrorCode.USER_HAS_BEEN_ADDED_TO_ROOM);
    }

    const roomParticipant = RoomParticipant.newRoomParticipant(
      input.userId,
      room.id,
    );
    await this.roomParticipantRepo.createRoomParticipant(roomParticipant);
    return new CreateRoomParticipantOutput(roomParticipant);
  }
}
