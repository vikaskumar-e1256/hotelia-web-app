import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { PaginationService } from 'src/shared/services/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register the User entity
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    PaginationService
  ],
  exports: [UsersService],
})
export class UsersModule {}
