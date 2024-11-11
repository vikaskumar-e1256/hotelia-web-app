import { Exclude } from 'class-transformer';

export class UserResponseDto {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    profile: string;

    @Exclude()
    password: string;

    @Exclude()
    provider: string;

    @Exclude()
    providerId: string;

    @Exclude()
    isEmailVerified: boolean;

    status: boolean;

    @Exclude()
    emailVerifiedAt: Date;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    tokenVersion: number;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}
