import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class UserRepository extends Repository<User> {
    // Custom methods here
    async findByEmail(email: string): Promise<User | undefined> {
        return this.findOne({ where: { email } });
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.findOne({ where: { username } });
    }
}
