import { Paragraph } from "./paragraph.dto";

export interface Content {
    id: string;
    title: string;
    paragraphs: Paragraph[];
}