import { BadRequestException } from '@nestjs/common/exceptions';
import { randomUUID } from 'crypto';
import { CreateQuestionPresenter } from '../presenters/create-question.presenter';
import { Inject, Injectable } from '@nestjs/common';
import { IQuestionRepository } from '../../domain/repositories/question.repository';
import { Choice, Question } from '../../domain/entities/question.entity';
import { CreateQuestionDto } from '../../presentations/dtos/create-question.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(IQuestionRepository)
    private readonly questionRepository: IQuestionRepository,
    @InjectMapper() private readonly questionMapper: Mapper,
  ) {}

  async create(dto: CreateQuestionDto): Promise<CreateQuestionPresenter> {
    if (dto.choices.length < 2) {
      throw new BadRequestException('Phải có ít nhất 2 lựa chọn');
    }

    const correctCount = dto.choices.filter((c) => c.isCorrect).length;
    if (correctCount !== 1) {
      throw new BadRequestException('Phải có đúng 1 đáp án đúng');
    }

    // const question = new Question(
    //   randomUUID(),
    //   dto.content,
    //   dto.explanation,
    //   dto.choices.map(
    //     (c) => new Choice(randomUUID(), c.text, c.isCorrect ?? false),
    //   ),
    // );
    const savedQuestion = await this.questionRepository.create(
      this.questionMapper.map(dto, CreateQuestionDto, Question),
    );

    return this.questionMapper.map(
      savedQuestion,
      Question,
      CreateQuestionPresenter,
    );
  }

  async update(id: string, dto: Partial<Question>): Promise<Question> {
    return this.questionRepository.update(id, dto);
  }

  //   async delete(id: string): Promise<void> {
  //     await this.repo.delete(id);
  //   }

  async findById(id: string): Promise<Question> {
    return this.questionRepository.findById(id);
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.findAll();
  }
}
