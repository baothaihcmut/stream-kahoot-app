import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { RoomUseCase } from './application/usecase/room.usecase';
import { RestRoomMapper } from './infrastructure/mappers/rest/rest_room.mapper';
import { RoomRepositoryToken } from './domain/repositories/room.repository';
import { PrismaRoomRepository } from './infrastructure/prisma/prisma_room.repository';
import { RoomController } from './presentations/rest/controllers/room.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule],
  providers: [
    {
      provide: RoomRepositoryToken,
      useClass: PrismaRoomRepository,
    },
    RoomUseCase,
    RestRoomMapper,
  ],
  exports: [RoomRepositoryToken],
  controllers: [RoomController],
})
export class RoomsModule {}
