import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JWTutil } from '../utils/jwt.util';

@Injectable()
export class PermissionMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method !== 'POST' && req.path !== 'claim') {
        const account_id = res.locals.account_id;
        //await this.firebaseService.checkAdminUser(account_id);
      }
    } catch (error) {
      throw error;
    }
    next();
  }
}
