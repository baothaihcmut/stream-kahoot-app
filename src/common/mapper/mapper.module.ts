import { Global, Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { QuestionProfile } from './profiles/question.profile';

@Global()
@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [QuestionProfile],
  exports: [AutomapperModule],
})
export class MapperModule {}
