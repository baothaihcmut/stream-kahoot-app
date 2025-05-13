import { AutoMap } from '@automapper/classes';

export class PaginationOutput {
  @AutoMap()
  count: number;

  @AutoMap()
  hasPrev: boolean;

  @AutoMap()
  hasNext: boolean;

  constructor(count: number, hasPrev: boolean, hasNext: boolean) {
    this.count = count;
    this.hasPrev = hasPrev;
    this.hasNext = hasNext;
  }

  static from(count: number, skip: number, limit: number): PaginationOutput {
    const hasPrev = skip > 0;
    const hasNext = skip + limit < count;
    return new PaginationOutput(count, hasPrev, hasNext);
  }
}
