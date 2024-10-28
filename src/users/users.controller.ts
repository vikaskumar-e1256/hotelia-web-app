import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { ResponseMessage } from '../shared/decorators/response_message.decorator';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create') // URL: /v1/users/create
  @ResponseMessage('User successfully created.')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get('username/:username') // URL: /v1/users/username/:username
  async getUserByUsername(@Param('username') username: string): Promise<User | undefined> {
    return this.usersService.findByUsername(username);
  }
}
