import { AutoMap } from '@automapper/classes';

export class GoogleExchangeTokenInput {
  constructor(public authCode: string) {}
}

export class GoogleExchangeTokenOutput {
  constructor(
    public accessToken: string,
    public refreshToken: string,
  ) {}
}
