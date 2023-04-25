import { Controller, Get, UseGuards, Param, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('users')
@Injectable()
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @UseGuards(AuthGuard())
  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
