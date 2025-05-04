import { Injectable } from '@nestjs/common';
import { ContextService } from 'src/common/context/context.service';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { GoogleLoginOutput } from '../presenters/google_login.presenter';
import { USER_GOOGLE_CONTEXT, UserGoogle } from '../models/user_google.model';
import { User } from 'src/modules/users/domain/entities/user';
import { JwtUtilService } from '../services/jwt.service';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class GoogleInteractor {
  constructor(
    private readonly contextService: ContextService,
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtUtilService,
  ) {}
  async exchangeToken(): Promise<GoogleLoginOutput> {
    const userGoogleContext: UserGoogle =
      this.contextService.get(USER_GOOGLE_CONTEXT);
    let user: User = await this.userRepo.findUserByEmail(
      userGoogleContext.email,
    );
    if (!user) {
      user = User.newUser(
        userGoogleContext.email,
        userGoogleContext.firstName,
        userGoogleContext.lastName,
        userGoogleContext.picture,
      );
      await this.userRepo.createUser(user);
    }
    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.generateAccessToken({
        userId: user.id,
        role: Role.USER,
      }),
      await this.jwtService.generateRefreshToken({
        userId: user.id,
      }),
    ]);
    user.updateRefreshToken(refreshToken);
    //update refresh token
    await this.userRepo.updateUser(user);
    return new GoogleLoginOutput(accessToken, refreshToken);
  }
}
