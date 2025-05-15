import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDTO {
  @AutoMap()
  @ApiProperty({ type: Number, description: 'count total element' })
  count: number;

  @AutoMap()
  @ApiProperty()
  hasPrev: boolean;

  @AutoMap()
  @ApiProperty()
  hasNext: boolean;
}
