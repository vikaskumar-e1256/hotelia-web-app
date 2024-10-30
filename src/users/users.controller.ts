import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { ResponseMessage } from '../shared/decorators/response_message.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';

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

  @Post('change-password')
  // @UseGuards(AuthGuard('jwt'))
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req: any) {
    const userId = req.user.id; // Assuming user ID is stored in request object by the AuthGuard
    return this.usersService.changePassword(userId, changePasswordDto);
  }
}
