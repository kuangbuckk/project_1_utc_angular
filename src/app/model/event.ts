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
    category_name: string;
    organization_id: number;
    organization_name: string;
    url: string;
    event_images: EventImage[];
}