import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class TicketCategoryDTO {
    @IsNotEmpty()
    @IsString()
    @Length(2, 255)
    category_name: string;

    @IsNotEmpty()
    @IsNumber()

    price: number;
    @IsNotEmpty()
    @IsNumber()
    remaining_count: number;

    @IsNotEmpty()
    @IsNumber()
    event_id: number;

    constructor(data: any) {
        this.category_name = data.ticket_category_name;
        this.price = data.price;
        this.remaining_count = data.remaining_count;
        this.event_id = data.event_id;
    }
}

