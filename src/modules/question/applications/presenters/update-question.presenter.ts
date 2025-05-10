import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

class UpdateChoiceDto {
  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  isCorrect: boolean = false;
}

export class UpdateQuestionDto {
  @IsOptional()
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateChoiceDto)
  choices: UpdateChoiceDto[];
}
