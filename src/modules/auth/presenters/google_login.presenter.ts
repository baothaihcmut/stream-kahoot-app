import { IsNotEmpty } from 'class-validator';

export class GoogleExchangeTokenInput {
  @IsNotEmpty({ message: 'auth code is required' })
  authCode: string;
}

export class GoogleExchangeTokenOutput {
  constructor(
    public accessToken: string,
    public refreshToken: string,
  ) {}
}
