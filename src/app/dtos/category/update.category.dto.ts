import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CategoryUpdateDTO {
    @IsNotEmpty()
    @IsString()
    @Length(2, 255)
    name: string;

    constructor(data: any) {
        this.name = data.name;
    }
}