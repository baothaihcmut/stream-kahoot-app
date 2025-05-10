// src/interfaces/dtos/question.presenter.ts
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionPresenter {
  @IsNotEmpty()
  @IsString()
  id: string; // ID của câu hỏi

  // @IsNotEmpty()
  // @IsString()
  // title: string; // Tiêu đề câu hỏi

  @IsNotEmpty()
  @IsString()
  content: string; // Nội dung câu hỏi

  @IsNotEmpty()
  @IsString()
  explanation: string; // Giải thích câu trả lời

  @IsArray()
  choices: {
    id: string; // ID của lựa chọn
    text: string; // Nội dung lựa chọn
    isCorrect: boolean; // Đúng/sai
  }[]; // Các lựa chọn câu trả lời

  @IsNotEmpty()
  @IsString()
  categoryId: string; // ID của Category (Thể loại)

  @IsNotEmpty()
  createdAt: Date; // Thời gian tạo câu hỏi

  @IsNotEmpty()
  updatedAt: Date; // Thời gian cập nhật câu hỏi
}
