import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import config from "../config/config"

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export class Authentication {
  async ensureAuthentication(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const authHeader = request.headers.authorization;
  
    if (!authHeader) {
      // throw new Error('JWT token is missing.');
      return response.status(401).json('JWT token is missing.')
    }
  
    const [_, token] = authHeader.split(' ');
  
    try {
  
      const decoded = verify(token, config.keyJwt);
  
      const { sub } = decoded as ITokenPayload;
  
      request.user = {
        id: sub,
        info: decoded
      }
  
      return next();
    } catch(err) {
      // throw new Error('Invalid JWT token');
      return response.status(401).json('Invalid JWT token')
  
    }
  }
}
