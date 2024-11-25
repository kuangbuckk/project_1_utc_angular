import { IsNotEmpty, IsEmail, IsString, IsDate, IsNumber, IsPassportNumber, IsPhoneNumber } from 'class-validator';

export class UserUpdateAdminDTO {
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
    
    @IsNumber()
    is_active: number;

    @IsDate()
    @IsNotEmpty()
    date_of_birth: Date;

    @IsNumber()
    role_id: number;
    
    @IsNumber()
    organization_id: number;

    constructor(data: any) {
        this.full_name = data.full_name;
        this.phone_number = data.phone_number;
        this.email = data.email;
        this.address = data.address;
        this.is_active = data.is_active;
        this.date_of_birth = data.date_of_birth;
        this.role_id = data.role_id;
        this.organization_id = data.organization_id;
    }
}