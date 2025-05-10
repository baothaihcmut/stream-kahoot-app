import { BadRequestException } from '@nestjs/common/exceptions';
import { randomUUID } from 'crypto';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IQuestionRepository } from '../../domain/repositories/question.repository';
import { Choice, Question } from '../../domain/entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(IQuestionRepository)
    private readonly repo: IQuestionRepository,
  ) {}

  async create(dto: CreateQuestionDto): Promise<Question> {
    if (dto.choices.length < 2) {
      throw new BadRequestException('Phải có ít nhất 2 lựa chọn');
    }

    const correctCount = dto.choices.filter((c) => c.isCorrect).length;
    if (correctCount !== 1) {
      throw new BadRequestException('Phải có đúng 1 đáp án đúng');
    }

    const question = new Question(
      randomUUID(),
      dto.content,
      dto.explanation,
      dto.choices.map(
        (c) => new Choice(randomUUID(), c.text, c.isCorrect ?? false),
      ),
    );

    return this.repo.create(question);
  }

  async update(id: string, dto: Partial<Question>): Promise<Question> {
    return this.repo.update(id, dto);
  }

  //   async delete(id: string): Promise<void> {
  //     await this.repo.delete(id);
  //   }

  async findById(id: string): Promise<Question> {
    return this.repo.findById(id);
  }

  async findAll(): Promise<Question[]> {
    return this.repo.findAll();
  }
}
