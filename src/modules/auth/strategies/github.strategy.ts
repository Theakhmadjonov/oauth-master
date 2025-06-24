import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.CLIENT_ID_GITHUB as string,
      clientSecret: process.env.CLIENT_SECRET_GITHUB as string,
      callbackURL: 'http://loclahost:4000/api/auth/github/callback',
      scope: ['email', 'profile'],
    });
  }
  validate(
    access_token: string,
    refresh_token: string,
    profile: any,
    verifyCallback: any,
  ): any {
    verifyCallback(null, profile);
  }
}
