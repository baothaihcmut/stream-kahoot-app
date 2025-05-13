import { AutoMap } from '@automapper/classes';

export class PaginationParam {
  @AutoMap()
  skip: number;

  @AutoMap()
  limit: number;
}
