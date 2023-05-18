import { Paragraph } from "./paragraph.dto";

export class CreateContent {
    title: string;
    paragraphs: Paragraph[];

    constructor(title: string, paragraphs: Paragraph[]) {
        this.title = title;
        this.paragraphs = paragraphs;
    }
}