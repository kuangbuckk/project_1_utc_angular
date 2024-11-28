import { User } from "./user";

export interface Feedback {
    id: number;
    email: string;
    type: string;
    content: string;
    status: string;
    user: User;
}