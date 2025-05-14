import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { PrismaUserRepository } from './infrastructure/prisma/prisma_user.repository';
import { UserRepositoryToken } from './domain/repositories/user.repository';

@Module({
  imports: [CommonModule],
  providers: [
    {
      provide: UserRepositoryToken,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepositoryToken],
})
export class UsersModule {}
