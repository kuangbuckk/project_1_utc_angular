import { IsNotEmpty, IsEmail, IsString, IsDate, IsNumber, IsPassportNumber, IsPhoneNumber } from 'class-validator';

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    constructor(data: any) {
        this.email = data.email;
        this.password = data.password;
    }
}