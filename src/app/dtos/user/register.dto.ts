import { IsNotEmpty, IsEmail, IsString, IsDate, IsNumber, IsPassportNumber, IsPhoneNumber } from 'class-validator';

export class RegisterDTO {
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsPhoneNumber()
    phone_number: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    address: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsNotEmpty()
    retype_password: string;
    @IsDate()
    @IsNotEmpty()
    date_of_birth: Date;
    facebook_account_id: number = 0;
    google_account_id: number = 0;
    role_id: number = 1;
    constructor(data: any) {
        this.full_name = data.full_name;
        this.phone_number = data.phone_number;
        this.email = data.email;
        this.address = data.address;
        this.password = data.password;
        this.retype_password = data.retype_password;
        this.date_of_birth = data.date_of_birth;
        this.facebook_account_id = data.facebook_account_id || 0;
        this.google_account_id = data.google_account_id || 0;
        this.role_id = data.role_id || 1;
    }
}