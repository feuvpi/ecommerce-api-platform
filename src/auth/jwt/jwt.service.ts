import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { User } from '../../users/user.schema';
import { UserService } from '../../users/user.service';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService, private readonly userService: UserService) {}

  generateToken(user: User): string {
    const payload = { sub: user._id, username: user.username, isAdmin: user.isAdmin };
    return this.nestJwtService.sign(payload);
  }

  async verifyToken(token: string, requireAdmin = false): Promise<User> {
    try {
      const payload = this.nestJwtService.verify(token);
      const { username } = payload;
      const user = await this.userService.findOneByUsername(username);
      if (!user) {
        throw new Error();
      }
      if (requireAdmin && !user.isAdmin) {
        throw new Error();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
