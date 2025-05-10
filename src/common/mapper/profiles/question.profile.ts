import { Injectable } from '@nestjs/common';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { randomUUID } from 'crypto';
import { CreateQuestionDto } from 'src/modules/question/presentations/dtos/create-question.dto';
import { Question } from 'src/modules/question/domain/entities/question.entity';
import { CreateQuestionPresenter } from 'src/modules/question/applications/presenters/create-question.presenter';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

@Injectable()
export class QuestionProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CreateQuestionDto,
        Question,
        forMember(
          (dest) => dest.id,
          mapFrom(() => randomUUID()),
        ),
        forMember(
          (dest) => dest.content,
          mapFrom((src) => src.content),
        ),
        forMember(
          (dest) => dest.explanation,
          mapFrom((src) => src.explanation),
        ),
        forMember(
          (dest) => dest.choices,
          mapFrom((src) => src.choices),
        ),
        forMember(
          (dest) => dest.createdAt,
          mapFrom(() => new Date()),
        ),
        forMember(
          (dest) => dest.updatedAt,
          mapFrom(() => new Date()),
        ),
      );

      createMap(
        mapper,
        Question,
        CreateQuestionPresenter,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.id),
        ),
        forMember(
          (dest) => dest.content,
          mapFrom((src) => src.content),
        ),
        forMember(
          (dest) => dest.explanation,
          mapFrom((src) => src.explanation),
        ),
        forMember(
          (dest) => dest.choices,
          mapFrom((src) => src.choices),
        ),
        forMember(
          (dest) => dest.createdAt,
          mapFrom((src) => src.createdAt),
        ),
        forMember(
          (dest) => dest.updatedAt,
          mapFrom((src) => src.updatedAt),
        ),
      );
    };
  }
}
