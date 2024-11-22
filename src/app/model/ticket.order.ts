export interface TicketOrder {
    id: number;
    user_id: number;
    order_date: Date;
    total_money: number;
    payment_method: string;
    payment_status: string;   
    stripe_token_id: string;
    email: string;
}