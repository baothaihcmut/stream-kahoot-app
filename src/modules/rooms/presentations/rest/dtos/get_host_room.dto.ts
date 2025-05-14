import { AutoMap } from '@automapper/classes';
import { ApiParam, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { RoomResponseDTO } from './room.dto';
import { PaginationResponseDTO } from 'src/common/response/pagination.response';
import { Type } from 'class-transformer';

export class GetHostRoomRequestDTO {
  @Type(() => Number)
  @IsNumber({}, { message: 'offset must be number' })
  @IsNotEmpty({ message: 'offset is required' })
  @AutoMap()
  @ApiProperty({ type: Number, description: 'for pagination' })
  offset: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'limit must be number' })
  @IsNotEmpty({ message: 'limit is required' })
  @AutoMap()
  @ApiProperty({ type: Number, description: 'for pagination' })
  limit: number;
}

export class GetHostRoomResponseDTO {
  @AutoMap(() => RoomResponseDTO)
  @ApiProperty({ type: RoomResponseDTO })
  rooms: RoomResponseDTO[];

  @AutoMap(() => PaginationResponseDTO)
  @ApiProperty()
  pagination: PaginationResponseDTO;
}
