import { IsNotEmpty, IsEmail, IsString, IsDate, IsNumber, IsPassportNumber, IsPhoneNumber } from 'class-validator';

export class UserUpdateDTO {
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
    current_password: string;

    @IsString()
    @IsNotEmpty()
    new_password: string;
    @IsString()
    @IsNotEmpty()
    retype_new_password: string;
    @IsDate()
    @IsNotEmpty()
    date_of_birth: Date;

    constructor(data: any) {
        this.full_name = data.full_name;
        this.phone_number = data.phone_number;
        this.email = data.email;
        this.address = data.address;
        this.current_password = data.current_password;
        this.new_password = data.new_password;
        this.retype_new_password = data.retype_new_password;
        this.date_of_birth = data.date_of_birth;
    }
}