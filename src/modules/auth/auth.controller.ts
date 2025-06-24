import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect() { }
  
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async oauthGoogleCallback(@Req() req: Request) {
    const user = req['user'];
    return await this.authService.oauthGoogleCallback(user);
  }
}
