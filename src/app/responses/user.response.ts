import { Role } from "../model/role";

export interface UserResponse {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    date_of_birth: Date;
    role: Role;
}