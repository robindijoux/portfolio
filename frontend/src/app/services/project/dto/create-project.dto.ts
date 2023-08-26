export class CreateProject {
    title: string;
    htmlContent?: string;

    constructor(title: string, htmlContent?: string) {
        this.title = title;
        this.htmlContent = htmlContent;
    }
}