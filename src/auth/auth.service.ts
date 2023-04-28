import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/users/user.service';
import { User } from '../modules/users/user.schema';
import { Types } from 'mongoose';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import decode from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.comparePassword(pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = new User();
      user._id = new Types.ObjectId();
      user.username = createUserDto.username;
      user.password = createUserDto.password;
      user.isAdmin = createUserDto.isAdmin;

      const { password, ...result } = await this.usersService.create(user);
      const payload = { username: user.username, sub: result._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error creating user: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async login(user: User) {
    const { username, password } = user;
    const foundUser = await this.usersService.findByUsername(username);

    if (foundUser && (await foundUser.comparePassword(password))) {
      const payload = { username: foundUser.username, sub: foundUser._id, roles: user.roles };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException('Invalid username or password');
  }

  decode() {
    return decode(localStorage.getItem('token'));
  }
}
