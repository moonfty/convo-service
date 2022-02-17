import { ForbiddenException, Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JWTutil } from '../utils/jwt.util';

@Injectable()
export class JWTAuthenticationMiddleware implements NestMiddleware {
    public readonly jwtservice = new JWTutil();

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const access_token = this.jwtservice.get(req);
            if (access_token === null) {
                throw new NotFoundException('Token not found');
            }

            const data: any = await this.jwtservice.verify(access_token);
            if (data.n_token && req.method != 'GET') {
                throw new ForbiddenException('Sign up required')
              }
            
            if(!data.n_token ){
                res.locals.user = data.id;
                res.locals.email = data.email;
            }
            else {
                res.locals.user = data.n_token;
            }
        } catch (error) {
            throw error;
        }
        next();
    }
}
