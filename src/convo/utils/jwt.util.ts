import { Request } from 'express';
import * as JWT from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_IN } from '../../config';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class JWTutil {
  secret = JWT_SECRET;
  expiresIn = +JWT_EXPIRES_IN;
  refreshIn = +JWT_REFRESH_IN;

  get(req: Request) {
    try {
      var access_token: string;
      const authorizationHeader = _.get(req, 'headers.authorization');
      if (authorizationHeader && _.includes(authorizationHeader, 'Bearer')) {
        access_token = _.get(req.headers, 'authorization').replace(
          'Bearer ',
          '',
        );
      }
      if (access_token) {
        return access_token;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  verify(token: string) {
    return new Promise((resolve, reject) => {
      JWT.verify(token, this.secret, (error, decoded) => {
        if (!error) {
          resolve(decoded);
        } else {
          throw new BadRequestException('Invalid JWT');
          //reject(error);
        }
      });
    });
  }
}
