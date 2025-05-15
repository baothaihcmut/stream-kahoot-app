import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Param,
  Put,
} from '@nestjs/common';
import { AppResponse } from 'src/common/response/response';
import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import { QuestionService } from '../../applications/usecases/question.usecase';
import { Question } from '../../domain/entities/question.entity';
import { CreateQuestionRequestDto } from '../dtos/create-question.dto';
import { QuestionMapper } from '../../infrastructures/mappers/rest/question.mapper';
import { InjectMapper } from '@automapper/nestjs';

@Controller('questions')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly questionMapper: QuestionMapper,
  ) {}

  @Post()
  public async createQuestion(
    @Body() request: CreateQuestionRequestDto,
    @Res() res: Response,
  ): Promise<void> {
    const question = await this.questionService.create(
      this.questionMapper.toCreateQuestionRequest(request),
    );
    res
      .status(StatusCodes.CREATED)
      .json(new AppResponse(true, 'Created Question Successful!', question));
  }

  @Get()
  public async getAllQuestions(@Res() res: Response): Promise<void> {
    const questions = await this.questionService.findAll();
    res
      .status(StatusCodes.OK)
      .json(new AppResponse(true, 'Get All Questions Successful!', questions));
  }

  @Get(':id')
  public async getQuestionById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    res
      .status(StatusCodes.OK)
      .json(
        new AppResponse(
          true,
          `Get Question ${id} Successful!`,
          await this.questionService.findById(id),
        ),
      );
  }

  @Put(':id')
  public async updateQuestion(
    @Param('id') id: string,
    @Body() dto: Partial<Question>,
    @Res() res: Response,
  ): Promise<void> {
    res
      .status(StatusCodes.OK)
      .json(
        new AppResponse(
          true,
          `Updated Question ${id} Successful!`,
          await this.questionService.update(id, dto),
        ),
      );
  }
}
