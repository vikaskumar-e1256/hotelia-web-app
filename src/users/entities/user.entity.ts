import { BaseEntity } from "src/shared/entities/base.entity";
import { Entity, Column } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @Column({ length: 100, unique: true })
    username: string;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 100 })
    password: string;

    @Column({ nullable: true })
    profile: string;

    @Column({ length: 15, nullable: true })
    contactNumber: string;

    @Column({ length: 100, nullable: true })
    provider: string;

    @Column({ length: 100, nullable: true })
    providerId: string;

    @Column({ default: false })
    isEmailVerified: boolean;

    @Column({ type: 'timestamp', nullable: true })
    emailVerifiedAt: Date;

}
