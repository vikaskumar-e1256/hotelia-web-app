import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { ResponseMessage } from '../shared/decorators/response_message.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { SkipAuth } from '../shared/decorators/public.decorator';

@UseGuards(AuthGuard)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SkipAuth()
  @Post('create') // URL: /v1/users/create
  @ResponseMessage('User successfully created.')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Post('change-password')
  @ResponseMessage('Password successfully updated')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req): Promise<Boolean> {
    const userId = req.user.id; // user data is stored in request object by the AuthGuard
    return this.usersService.changePassword(userId, changePasswordDto);
  }

  @Get()
  @ResponseMessage('User successfully fetched.')
  async users() {
    return this.usersService.getUsers();
  }
}
