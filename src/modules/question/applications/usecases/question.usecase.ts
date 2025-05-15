import { BadRequestException } from '@nestjs/common/exceptions';
import { randomUUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { IQuestionRepository } from '../../domain/repositories/question.repository';
import { Choice, Question } from '../../domain/entities/question.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  CreateQuestionRequest,
  CreateQuestionResponse,
} from '../presenters/create-question-request.presenter';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(IQuestionRepository)
    private readonly questionRepository: IQuestionRepository,
    @InjectMapper() private readonly questionMapper: Mapper,
  ) {}

  async create(
    request: CreateQuestionRequest,
  ): Promise<CreateQuestionResponse> {
    if (request.choices.length < 2) {
      throw new BadRequestException('Phải có ít nhất 2 lựa chọn');
    }

    const correctCount = request.choices.filter((c) => c.isCorrect).length;
    if (correctCount !== 1) {
      throw new BadRequestException('Phải có đúng 1 đáp án đúng');
    }

    const question = Question.newQuestion({
      content: request.content,
      explanation: request.explanation,
      choices: request.choices,
    });

    await this.questionRepository.create(question);

    return new CreateQuestionResponse(question);
  }

  async update(id: string, request: Partial<Question>): Promise<Question> {
    return this.questionRepository.update(id, request);
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
