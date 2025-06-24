import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.CLIENT_ID_GOOGLE as string,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE as string,
      callbackURL: 'http://loclahost:4000/api/auth/google/callback',
      scope: ["email", "profile"],
    });
  }
  validate(
    access_token: string,
    profile: Profile,
    verifyCallback: VerifyCallback,
  ): any {
    const user = profile._json;
    verifyCallback(null, user);

    



    
  }
}
