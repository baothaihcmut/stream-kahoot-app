import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { RoomUseCase } from './application/usecase/room.usecase';
import { RestRoomMapper } from './infrastructure/mappers/rest/rest_room.mapper';
import { RoomRepositoryToken } from './domain/repositories/room.repository';
import { PrismaRoomRepository } from './infrastructure/prisma/prisma_room.repository';
import { RoomController } from './presentations/rest/controllers/room.controller';
import { AuthModule } from '../auth/auth.module';
import { RoomParicipantRepositoryToken } from './domain/repositories/room_paricipant.repository';
import { PrismaRoomParticipantRepository } from './infrastructure/prisma/prisma_room_participant.repository';
import { RoomParticipantUseCase } from './application/usecase/room_participant.usecase';
import { RestRoomParticipantMapper } from './infrastructure/mappers/rest/rest_room_participant.mapper';
import { RoomParticipantController } from './presentations/rest/controllers/room_participant.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [CommonModule, AuthModule, UsersModule],
  providers: [
    {
      provide: RoomRepositoryToken,
      useClass: PrismaRoomRepository,
    },
    {
      provide: RoomParicipantRepositoryToken,
      useClass: PrismaRoomParticipantRepository,
    },
    RoomUseCase,
    RoomParticipantUseCase,
    RestRoomMapper,
    RestRoomParticipantMapper,
  ],
  exports: [RoomRepositoryToken],
  controllers: [RoomController, RoomParticipantController],
})
export class RoomsModule {}
