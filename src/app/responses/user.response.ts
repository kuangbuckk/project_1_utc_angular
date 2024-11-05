import { Role } from "../model/role";

export interface UserResponse {
    id: number;
    fullname: string;
    address: string;
    date_of_birth: Date;
    roles: Role;
}