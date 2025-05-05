import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}
