import { Prisma, PrismaClient } from '@prisma/client';
import { Choice, Question } from '../../domain/entities/question.entity';
import { Injectable } from '@nestjs/common';
import { IQuestionRepository } from '../../domain/repositories/question.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { randomUUID, UUID } from 'crypto';

@Injectable()
export class PrismaQuestionRepository implements IQuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(question: Question): Promise<Question> {
    const created = await this.prisma.question.create({
      data: {
        id: question.id,
        content: question.content,
        explanation: question.explanation,
        // categories:
        choices: {
          create: question.choices.map((choice) => ({
            id: choice.id,
            text: choice.text,
            isCorrect: choice.isCorrect,
          })),
        },
      },
      include: { choices: true },
    });
    return new Question(
      created.id as UUID,
      created.content,
      created.explanation,
      created.choices.map((c) => new Choice(c.id as UUID, c.text, c.isCorrect)),
      created.createdAt,
      created.updatedAt,
    );
  }

  async findAll(): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      include: { choices: true },
    });

    return questions.map(
      (q) =>
        new Question(
          q.id as UUID,
          q.content,
          q.explanation,
          q.choices.map((c) => new Choice(c.id as UUID, c.text, c.isCorrect)),
          q.createdAt,
          q.updatedAt,
        ),
    );
  }
  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: { choices: true },
    });

    return new Question(
      question.id as UUID,
      question.content,
      question.explanation,
      question.choices.map(
        (c) => new Choice(c.id as UUID, c.text, c.isCorrect),
      ),
      question.createdAt,
      question.updatedAt,
    );
  }

  async update(id: string, question: Partial<Question>): Promise<Question> {
    const updated = await this.prisma.question.update({
      where: { id },
      data: {
        content: question.content,
        explanation: question.explanation,
        choices: question.choices
          ? { set: question.choices.map((choice) => ({ id: choice.id })) }
          : undefined,
      },
      include: { choices: true },
    });

    return new Question(
      updated.id as UUID,
      updated.content,
      updated.explanation,
      updated.choices.map((c) => new Choice(c.id as UUID, c.text, c.isCorrect)),
      updated.createdAt,
      updated.updatedAt,
    );
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
