import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleAuthService {
  googleLogin(req) {
    if (!req.user) {
      return { message: 'No user from google' };
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
