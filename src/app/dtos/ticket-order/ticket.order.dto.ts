export class TicketOrderDTO {
    user_id: number;
    total_money: number;
    payment_method: string;
    stripe_token_id: string;
    email: string;

    constructor(data: any) {
        this.user_id = data.user_id;
        this.total_money = data.total_money;
        this.payment_method = data.payment_method;
        this.stripe_token_id = data.stripe_token_id;
        this.email = data.email;
    }
}