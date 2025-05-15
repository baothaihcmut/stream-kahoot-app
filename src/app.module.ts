import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorHandler } from './common/filters/error.filter';
import { AppExceptionFilter } from './common/filters/app_exception.filter';
import { HttpExceptionFilter } from './common/filters/http_exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { UserContextInterceptor } from './common/interceptors/user_context.interceptor';
import { RoomsModule } from './modules/rooms/rooms.module';
import { QuestionModule } from './modules/question/question.module';
import { AutomapperModule } from '@automapper/nestjs';
// import { MapperModule } from './common/mapper/mapper.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    AuthModule,
    QuestionModule,
    AutomapperModule,
    // MapperModule,
    RoomsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorHandler,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: UserContextInterceptor,
    },
  ],
})
export class AppModule {}
