import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { QuestionService } from './applications/services/question.service';
import { QuestionController } from './presentations/question.controller';
import { PrismaQuestionRepository } from './infrastructures/prisma/question.prisma';
import { IQuestionRepository } from './domain/repositories/question.repository';

@Module({
  imports: [CommonModule],
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
