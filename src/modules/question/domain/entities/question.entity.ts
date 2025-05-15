import { randomUUID, UUID } from 'crypto';

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

  static newQuestion(params: {
    content: string;
    explanation?: string;
    choices: { text: string; isCorrect?: boolean }[];
  }): Question {
    const now = new Date();

    const choices = params.choices.map(
      (choice) =>
        new Choice(randomUUID(), choice.text, choice.isCorrect ?? false),
    );

    return new Question(
      randomUUID(),
      params.content,
      params.explanation,
      choices,
      now,
      now,
    );
  }
}
