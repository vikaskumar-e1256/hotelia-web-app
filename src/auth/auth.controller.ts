import { Controller, Post, Body, HttpStatus, HttpCode, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResponseMessage } from '../shared/decorators/response_message.decorator';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { AuthGuard } from '../shared/guards/auth.guard';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Login successfully')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Request() req): Promise<UserResponseDto> {
    return new UserResponseDto(req.user);
  }
}
