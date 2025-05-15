import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  EMAIL_NOT_EXIST_IN_SYSTEM = 'email not exist in system',
  USER_PENDING_FOR_CONFIRM = 'user pending for confirm',
  INVALID_CONFIRM_CODE = 'invalid confirm code',
  WRONG_EMAIL_OR_PASSWORD = 'wrong email or password',
  ROOM_NOT_FOUND = 'room not found',
  USER_IS_NOT_ROOM_HOST = 'user is not room host',
  USER_HAS_BEEN_ADDED_TO_ROOM = 'user has been added to this room',
  USER_NOT_FOUND = 'user not found',
}
export const ErrorCodeMap: Record<ErrorCode, HttpStatus> = {
  [ErrorCode.EMAIL_NOT_EXIST_IN_SYSTEM]: HttpStatus.UNAUTHORIZED,
  [ErrorCode.USER_PENDING_FOR_CONFIRM]: HttpStatus.FORBIDDEN,
  [ErrorCode.INVALID_CONFIRM_CODE]: HttpStatus.UNAUTHORIZED,
  [ErrorCode.WRONG_EMAIL_OR_PASSWORD]: HttpStatus.UNAUTHORIZED,
  [ErrorCode.ROOM_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ErrorCode.USER_IS_NOT_ROOM_HOST]: HttpStatus.FORBIDDEN,
  [ErrorCode.USER_HAS_BEEN_ADDED_TO_ROOM]: HttpStatus.CONFLICT,
  [ErrorCode.USER_NOT_FOUND]: HttpStatus.NOT_FOUND,
};
export class AppException extends Error {
  code: HttpStatus;
  message: string;

  constructor(errorCode: ErrorCode) {
    super(errorCode);
    this.message = errorCode;
    this.code = ErrorCodeMap[errorCode];
    Object.setPrototypeOf(this, AppException.prototype);
  }
}
