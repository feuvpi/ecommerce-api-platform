import { Controller, Get, UseGuards, Param, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { RolesGuard } from '../../common/guards/role.guard';
import { Role } from '../../common/enums/roles.enums';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('users')
@Injectable()
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
