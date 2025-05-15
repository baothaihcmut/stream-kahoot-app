import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Question } from '../../domain/entities/question.entity';
import { QuestionResponseDto } from './question-response.dto';
import { AutoMap } from '@automapper/classes';

export class CreateChoiceDto {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  id: string; // ID của câu hỏi

  @IsString()
  @AutoMap()
  text: string;

  @IsOptional()
  @AutoMap()
  isCorrect: boolean = false;
}

export class CreateQuestionRequestDto {
  @IsString()
  @AutoMap()
  content: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  explanation: string;

  // @IsArray()
  // @IsString({
  //     each: true
  // })
  // categoryIds: string[]

  @IsArray()
  @AutoMap(() => [CreateChoiceDto])
  @ValidateNested({ each: true })
  @Type(() => CreateChoiceDto)
  choices: CreateChoiceDto[];
}

export class CreateQuestionResponseDto extends QuestionResponseDto {}
