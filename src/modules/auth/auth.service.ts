import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private db: PrismaService,
    private jwt: JwtService,
  ) {}
  async oauthGoogleCallback(user: any) {
    const findUSer = await this.db.user.findFirst({
      where: { email: user.email },
    });
    if (!findUSer) {
      const newUser = await this.db.user.create({
        data: {
          email: user.email,
          fullName: user.name,
          oauth_account_user: true,
        },
      });
      await this.db.oAuthAccounts.create({
        data: {
          provider: 'google',
          providerId: user.sub,
          userId: newUser.id,
        },
      });
      const token = await this.jwt.signAsync({ userId: newUser.id });
      return { token };
    }
  }

  async oauthGithubCallback(user: any) {
    const findUSer = await this.db.user.findFirst({
      where: { email: user.email },
      include: { OAuthAccounts: true },
    });
    if (!findUSer) {
      const newUser = await this.db.user.create({
        data: {
          email: user.email,
          fullName: user.name,
          oauth_account_user: true,
        },
      });
      await this.db.oAuthAccounts.create({
        data: {
          provider: 'github',
          providerId: user.id,
          userId: newUser.id,
        },
      });
      const token = await this.jwt.signAsync({ userId: newUser.id });
      return { token };
    }
    const findAccount = findUSer.OAuthAccounts.find(
      (account) => account.provider === 'github',
    );
    if (!findAccount) {
      await this.db.oAuthAccounts.create({
        data: {
          provider: 'github',
          providerId: user.id,
          userId: findUSer.id,
        },
      });
    }
    const token = await this.jwt.signAsync({ userId: findUSer.id });
    return { token };
  }
}
