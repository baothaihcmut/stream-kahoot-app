import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { PaginationMapper } from './pagination.mapper';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [PaginationMapper],
  exports: [PaginationMapper],
})
export class MapperModule {}
