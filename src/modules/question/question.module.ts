import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { QuestionService } from './applications/usecases/question.usecase';
import { PrismaQuestionRepository } from './infrastructures/prisma/question.prisma';
import { IQuestionRepository } from './domain/repositories/question.repository';
import { QuestionController } from './presentations/rest/question.controller';
import { MapperModule } from 'src/common/mapper/mapper.module';
import { AutomapperModule } from '@automapper/nestjs';

@Module({
  imports: [CommonModule, MapperModule],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    {
      provide: IQuestionRepository,
      useClass: PrismaQuestionRepository,
    },
  ],
  exports: [IQuestionRepository],
})
export class QuestionModule {}
