// src/interfaces/dtos/question.presenter.ts
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Question } from '../../domain/entities/question.entity';
import { AutoMap } from '@automapper/classes';

class Choice {
  @IsString()
  @AutoMap()
  text: string;

  @IsOptional()
  @AutoMap()
  isCorrect: boolean = false;
}

export class QuestionResponse {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  id: string; // ID của câu hỏi

  // @IsNotEmpty()
  // @IsString()
  // title: string; // Tiêu đề câu hỏi

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  content: string; // Nội dung câu hỏi

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  explanation: string; // Giải thích câu trả lời

  @IsArray()
  @AutoMap(() => [Choice])
  choices: {
    id: string; // ID của lựa chọn
    text: string; // Nội dung lựa chọn
    isCorrect: boolean; // Đúng/sai
  }[]; // Các lựa chọn câu trả lời

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  categoryId: string; // ID của Category (Thể loại)

  @IsNotEmpty()
  @AutoMap()
  createdAt: Date; // Thời gian tạo câu hỏi

  @IsNotEmpty()
  @AutoMap()
  updatedAt: Date; // Thời gian cập nhật câu hỏi

  constructor(question: Question) {
    Object.assign(this, question);
  }
}
