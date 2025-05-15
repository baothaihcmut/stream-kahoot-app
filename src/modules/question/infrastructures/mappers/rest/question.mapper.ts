import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { request } from 'http';
import { map } from 'rxjs';
import {
  CreateChoice,
  CreateQuestionRequest,
  CreateQuestionResponse,
} from 'src/modules/question/applications/presenters/create-question-request.presenter';
import {
  CreateChoiceDto,
  CreateQuestionRequestDto,
  CreateQuestionResponseDto,
} from 'src/modules/question/presentations/dtos/create-question.dto';

@Injectable()
export class QuestionMapper extends AutomapperProfile {
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateChoiceDto, CreateChoice);
      createMap(mapper, CreateQuestionRequestDto, CreateQuestionRequest);
      createMap(mapper, CreateQuestionResponse, CreateQuestionResponseDto);
    };
  }
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public toCreateQuestionRequest(
    request: CreateQuestionRequestDto,
  ): CreateQuestionRequest {
    return this.mapper.map(
      request,
      CreateQuestionRequestDto,
      CreateQuestionRequest,
    );
  }

  public toCreateQuestionResponseDto(
    presenter: CreateQuestionResponse,
  ): CreateQuestionResponseDto {
    return this.mapper.map(
      presenter,
      CreateQuestionResponse,
      CreateQuestionResponseDto,
    );
  }
}
