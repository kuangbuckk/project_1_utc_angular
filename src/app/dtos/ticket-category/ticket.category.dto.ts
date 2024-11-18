import { IsNotEmpty, IsString, Length } from 'class-validator';

export class TicketCategoryDTO {
    @IsNotEmpty()
    @IsString()
    @Length(2, 255)
    ticket_category_name: string;
    price: number;
    remaining_count: number;
    eventId: number;

    constructor(data: any) {
        this.ticket_category_name = data.ticket_category_name;
        this.price = data.price;
        this.remaining_count = data.remaining_count;
        this.eventId = data.eventId;
    }
}

