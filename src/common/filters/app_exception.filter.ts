import { ArgumentsHost, Catch } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Response } from 'express';
import { AppResponse } from '../response/response';
import { AppException } from '../exception/app.exception';

@Catch(AppException)
export class AppExceptionFilter extends ExceptionsHandler {
  catch(exception: AppException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.code;
    const message = exception.message;
    console.log(exception);
    response
      .status(status)
      .json(AppResponse.initResponse(false, message, null));
  }
}
