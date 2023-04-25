// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { JwtPayload } from '../interfaces/jwt-payload.interface';
// import { UserService } from '../../users/user.service';
// import { User } from '../../users/user.schema';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly userService: UserService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET,
//     });
//   }

//   async validate(payload: JwtPayload): Promise<User> {
//     const { username, isAdmin } = payload;
//     const user = await this.userService.findOneByUsername(username);
//     if (!user) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     if (isAdmin && !user.isAdmin) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     return user;
//   }
// }
