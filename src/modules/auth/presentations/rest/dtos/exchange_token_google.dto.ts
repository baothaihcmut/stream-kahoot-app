import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';

export class ExchangeTokenGoogleRequestDTO {
  @IsNotEmpty({ message: 'auth code is required' })
  @AutoMap()
  authCode: string;
}

export class ExchangeTokenGoogleResponseDTO {}
