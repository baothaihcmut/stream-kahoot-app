import { ApiProperty } from '@nestjs/swagger';

export class AppResponse<T = any> {
  @ApiProperty({ type: 'boolean' })
  success: boolean;

  @ApiProperty({ type: 'string' })
  message: string;

  @ApiProperty()
  data: T;

  constructor(success: boolean, message: string, data: any) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
  static initResponse<T>(
    success: boolean,
    message: string,
    data: T,
  ): AppResponse {
    return new AppResponse(success, message, data);
  }
}
