import { IsEmail, IsNotEmpty, IsOptional, IsBoolean, IsString, Length } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    username: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(5, 100)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 100)
    password: string;

    @IsOptional()
    @IsString()
    @Length(10, 15)
    contactNumber?: string;

    @IsOptional()
    @IsString()
    @Length(3, 100)
    provider?: string;

    @IsOptional()
    @IsString()
    @Length(3, 100)
    providerId?: string;

    @IsOptional()
    @IsBoolean()
    isEmailVerified?: boolean;

    @IsOptional()
    @IsBoolean()
    status?: boolean;
}
