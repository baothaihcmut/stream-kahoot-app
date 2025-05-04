import { randomUUID, UUID } from 'crypto';

export class User {
  constructor(
    public id: UUID,
    public firstName: string,
    public lastName: string,
    public email: string,
    public picture: string,
    public currentRefreshToken?: string,
  ) {}

  static newUser(
    email: string,
    firstName: string,
    lastName: string,
    picture: string,
  ): User {
    return new User(randomUUID(), firstName, lastName, email, picture);
  }

  updateRefreshToken(refreshToken: string) {
    this.currentRefreshToken = this.currentRefreshToken;
  }
}
