export class FeedbackDTO {
    email: string;
    type: string;
    content: string;
    user_id: number;

    constructor(email: string, type: string, content: string, user_id: number) {
        this.email = email;
        this.type = type;
        this.content = content;
        this.user_id = user_id;
    }
}