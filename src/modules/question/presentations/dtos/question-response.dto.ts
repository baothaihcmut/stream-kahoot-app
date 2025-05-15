import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ChoiceDto {
  @IsNotEmpty()
  @IsString()
  id: string; // ID của câu hỏi

  @IsString()
  @AutoMap()
  text: string;

  @IsOptional()
  @AutoMap()
  isCorrect: boolean = false;
}

export class QuestionResponseDto {
  @IsNotEmpty()
  @IsString()
  id: string; // ID của câu hỏi

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
  @AutoMap()
  @ValidateNested({ each: true })
  @Type(() => ChoiceDto)
  choices: ChoiceDto[];
}
