import { CreateParagraph } from "../../paragraph/dto/create-paragraph.dto";

export class CreateProject {
    title: string;
    paragraphs: CreateParagraph[];

    constructor(title: string, paragraphs: CreateParagraph[]) {
        this.title = title;
        this.paragraphs = paragraphs;
    }
}