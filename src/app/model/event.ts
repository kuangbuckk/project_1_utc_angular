import { EventImage } from './event.image';

export interface Event {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    location: string;
    start_date: Date;
    end_date: Date;
    category_id: number;
    organization_id: number;
    url: string;
    event_images: EventImage[];
}