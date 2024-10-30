import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {

    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    // Custom methods here
    async findByEmail(email: string): Promise<User | undefined> {
        return this.findOne({ where: { email } });
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.findOne({ where: { username } });
    }
}
