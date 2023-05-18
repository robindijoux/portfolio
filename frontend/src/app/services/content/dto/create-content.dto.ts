import { Paragraph } from "./paragraph.dto";

export class CreateContent {
    id: string;
    title: string;
    paragraphs: Paragraph[];

    constructor(title: string, paragraphs: Paragraph[]) {
        this.id = new Date().toString(),
        this.title = title;
        this.paragraphs = paragraphs;
    }
}