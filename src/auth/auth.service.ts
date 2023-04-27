import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/users/user.service';
import { User } from '../modules/users/user.schema';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { Types } from 'mongoose';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(payload: JwtPayload): Promise<any> {
    // Find the user in the database by their ID (which is the username in this case)
    const user = await this.usersService.findByUsername(payload.username);
    console.log(payload);
    console.log(`password:` + payload.password);
    console.log(user);
    console.log(await user.comparePassword(payload.password));
    // If a user is found and their password is correct, return the user object
    if (user && (await user.comparePassword(payload.password))) {
      // Remove the password field from the user object
      const { ...result } = user.toJSON();
      return result;
    }

    // If the user is not found or their password is incorrect, return null
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
      const payload = { username: foundUser.username, sub: foundUser._id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException('Invalid username or password');
  }
}
