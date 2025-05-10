import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import {
  USER_PRISMA_REPO,
  UserPrisma,
} from './infrastructure/prisma/user.prisma';

@Module({
  imports: [CommonModule],
  providers: [
    {
      provide: USER_PRISMA_REPO,
      useClass: UserPrisma,
    },
  ],
  exports: [USER_PRISMA_REPO],
})
export class UsersModule {}
