import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function EnsureAuthentication(
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

    const decoded = verify(token, "TESTE");

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub
    }

    return next();
  } catch(err) {
    // throw new Error('Invalid JWT token');
    return response.status(401).json('Invalid JWT token')

  }
}

export default EnsureAuthentication;