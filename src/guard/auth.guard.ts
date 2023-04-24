import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '../auth/jwt/jwt.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService?: JwtService, private readonly requireAdmin = false) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return false;
    }
    try {
      await this.jwtService.verifyToken(token, this.requireAdmin);
      return true;
    } catch (err) {
      return false;
    }
  }
}
