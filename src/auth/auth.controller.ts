import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import { Roles } from './guards/decorators/roles.decorator';
import { Role } from './guards/enums/roles.enums';
import { RolesGuard } from './guards/role.guard';
//import { JwtAuthGuard } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.login(authCredentialsDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async test() {
    return { message: 'This route is an admin only route' };
  }

  @Post('/testjwt')
  @UseGuards(AuthGuard('jwt'))
  async jwtTest() {
    return { message: 'This route is protected by JWT' };
  }
}
