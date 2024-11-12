export class EventImageDto {
    image_url: string;
    event_id: number;

    constructor(image_url: string, event_id: number) {
        this.image_url = image_url;
        this.event_id = event_id;
    }
}