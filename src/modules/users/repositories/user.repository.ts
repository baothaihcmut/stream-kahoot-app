import { Injectable } from '@nestjs/common';
import { User } from '../domain/entities/user';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UUID } from 'crypto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private mapToDomainUser(data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
    currentRefreshToken?: string;
  }): User {
    return new User(
      data.id as UUID,
      data.firstName,
      data.lastName,
      data.email,
      data.picture,
      data.currentRefreshToken,
    );
  }
  async findUserByEmail(email: string): Promise<User> {
    const res = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
    return this.mapToDomainUser(res);
  }
  async createUser(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picture: user.picture,
        currentRefreshToken: user.currentRefreshToken,
      },
    });
  }
}
