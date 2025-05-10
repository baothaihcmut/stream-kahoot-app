import { Question } from '../entities/question.entity';

export const IQuestionRepository = Symbol('IQuestionRepository');

export interface IQuestionRepository {
  create(question: Question): Promise<Question>;
  findAll(): Promise<Question[]>;
  findById(id: string): Promise<Question | null>;
  update(id: string, question: Partial<Question>): Promise<Question>;
  delete(id: string): Promise<void>;
}
