import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

class CreateChoiceDto {
  @IsString()
  text: string;

  @IsOptional()
  isCorrect: boolean = false;
}

export class CreateQuestionDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  explanation: string;

  // @IsArray()
  // @IsString({
  //     each: true
  // })
  // categoryIds: string[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChoiceDto)
  choices: CreateChoiceDto[];
}
