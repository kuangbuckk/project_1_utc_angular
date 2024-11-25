export interface Ticket {
    id: number;
    ticket_category_id: number;
    ticket_category_name: string;
    user_name: string;
    user_email: string;
    user_id: number;
    status: string;
    price: number;
    created_at: number[];
    updated_at: number[];
}