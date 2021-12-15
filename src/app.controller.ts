import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthDto } from './event/dtos/auth.dto';
import { FirebaseService } from './event/services/firebase.service';
import { JWTutil } from './event/utils/jwt.util';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly firebaseService: FirebaseService,
  ) {}
  public readonly jwtUtil = new JWTutil();

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth')
  async getAccessToken(
    @Body() data: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    var access_token: string;
    try {
      const filtered_account = await this.firebaseService.getUser(data);
      if (!filtered_account) {
        throw new NotFoundException();
      }
      if (filtered_account.email != data.email) {
        throw new BadRequestException();
      }
      access_token = await this.jwtUtil.sign(data);
    } catch (error) {
      throw error;
    }
    if (access_token === null) {
      throw new NotFoundException('Wrong id');
    } else {
      try {
        /*
        response.header('withCredentials', 'include');
        response.header('Access-Control-Allow-Credentials', 'true');
        response.cookie('access_token', access_token, {
          httpOnly: true,
          domain: 'localhost',
        });
        */
        response.header('withCredentials', 'include');
        response.header('Access-Control-Allow-Credentials', 'true');
        response.send({ access_token: access_token });
        //return access_token;
      } catch (error) {
        throw error;
      }
    }
  }
}
