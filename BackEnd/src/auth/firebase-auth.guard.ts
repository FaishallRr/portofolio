import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import admin from '../firebase/firebase-admin';

// interface request yang sudah diautentikasi
interface AuthenticatedRequest extends Request {
  user: {
    uid: string;
    email?: string;
  };
}

interface FirebaseDecodedToken {
  uid: string;
  email?: string;
  [key: string]: any;
}

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const authHeader = req.headers['authorization'];
    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    try {
      const decodedToken = (await admin
        .auth()
        .verifyIdToken(token)) as FirebaseDecodedToken;

      // pasang user ke request yang sudah type-safe
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
      };

      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
