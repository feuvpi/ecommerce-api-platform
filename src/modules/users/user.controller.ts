import { Controller, Get, UseGuards, Param, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { RolesGuard } from '../../auth/guards/role.guard';
import { Role } from '../../auth/guards/enums/roles.enums';
import { Roles } from '../../auth/guards/decorators/roles.decorator';

@Controller('users')
@Injectable()
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  async findAll() {
    return this.userService.findAll();
  }
}
