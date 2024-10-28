import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register the User entity
  controllers: [UsersController],
  providers: [
    UsersService,
    {
        provide: UserRepository, // Provide your custom repository
        useClass: UserRepository, // Use your custom class
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
