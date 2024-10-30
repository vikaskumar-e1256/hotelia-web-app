import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { UserResponseDto } from './dto/user-response.dto';
import { ChangePasswordDto } from './dto/change-password.dto';


@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UserRepository // Injecting the custom repository
  ) { }

  async findByUsername(username: string): Promise<UserResponseDto | undefined> {
    return this.userRepository.findByUsername(username);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Check if username is already taken
    const existingUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUsername) throw new BadRequestException('Username is already taken');

    // Check if email is already registered
    const existingEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingEmail) throw new BadRequestException('Email is already registered');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const user = await this.userRepository.save(newUser);

    // Return the UserResponseDto to exclude sensitive data
    return new UserResponseDto(user);
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await bcrypt.compare(changePasswordDto.currentPassword, user.password);
    if (!passwordMatch) throw new BadRequestException('Current password is incorrect');

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);

    return 'Password updated successfully';
  }
}
