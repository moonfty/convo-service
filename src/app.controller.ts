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
import { JWTutil } from './convo/utils/jwt.util';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
    public readonly jwtUtil = new JWTutil();

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
