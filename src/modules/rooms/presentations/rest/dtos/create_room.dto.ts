import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDate,
  Min,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import { RoomResponseDTO } from './room.dto';

export class CreateRoomRequestDTO {
  @ApiProperty({
    type: String,
    example: 'Daily Standup',
    description: 'Title of the room',
  })
  @IsString({ message: 'title must be string' })
  @IsNotEmpty({ message: 'title is required' })
  @AutoMap()
  title: string;

  @ApiProperty({
    type: String,
    example: 'Daily sync',
    description: 'Short description of the room',
    maxLength: 10,
  })
  @IsString({ message: 'description must be string' })
  @MaxLength(10, { message: 'length of description must be less than 10' })
  @AutoMap()
  description: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2025-06-01T10:00:00.000Z',
    description: 'Start time of the room (ISO 8601 format)',
  })
  @IsDate({ message: 'started at must be date' })
  @IsNotEmpty({ message: 'started at is required' })
  @Type(() => Date)
  @AutoMap()
  startedAt: Date;

  @ApiProperty({
    type: Number,
    example: 10,
    description: 'Maximum number of participants',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'max participant is required' })
  @Min(0, { message: 'max participant must be greater than 0' })
  @IsNumber({}, { message: 'max participant must be number' })
  @AutoMap()
  maxParticipant: number;
}

export class CreateRoomResponseDTO extends RoomResponseDTO {}
