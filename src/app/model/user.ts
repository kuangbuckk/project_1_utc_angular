import { Role } from './role';
export interface User {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    date_of_birth: Date;
    role: Role;
}