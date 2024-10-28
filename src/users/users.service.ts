import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { UserResponseDto } from './dto/user-response.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository // Injecting the custom repository
  ) {}


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

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findByEmail(email);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findByUsername(username);
  }
}
