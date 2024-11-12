import { EventImageDto } from './event.image.dto';

export class EventDTO {
    name: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    category_id: number;
    organization_id: number;

    constructor(name: string, description: string, thumbnail: string, location: string, start_date: string, end_date: string, category_id: number, organization_id: number, url: string, event_images: EventImageDto[]) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.start_date = start_date;
        this.end_date = end_date;
        this.category_id = category_id;
        this.organization_id = organization_id;
    }
}