import { UUID } from 'crypto';

export class Choice {
  constructor(
    public readonly id: UUID,
    public text: string,
    public isCorrect: boolean = false,
  ) {}
}

export class Question {
  constructor(
    public readonly id: UUID,
    public content: string,
    public explanation?: string,
    public choices: Choice[] = [],
    // public categoryIds: string[] = [],
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
