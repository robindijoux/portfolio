import { Component } from '@angular/core';
import { Content } from '../services/content/dto/content.dto';
import { BehaviorSubject, map } from 'rxjs';
import { ContentService } from '../services/content/content.service';
import { SessionService } from '../services/session/session.service';
import { ROLE } from '../services/session/dto/session.dto';
import { Paragraph } from '../services/content/dto/paragraph.dto';
import { CreateContent } from '../services/content/dto/create-content.dto';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass'],
})
export class ContentComponent {
  content$: BehaviorSubject<Content | undefined>;

  editModeTitle = false;
  editedTitle?: string;

  // Declare arrays or maps for form inputs
  editModeParagraphTitle: boolean[] = [];
  editModeContent: boolean[] = [];
  editedParagraphTitle: string[] = [];
  editedContent: string[] = [];

  constructor(
    private contentService: ContentService,
    private sessionService: SessionService
  ) {
    this.content$ = this.contentService.getSelectedContent();
    // Fetch the content data and initialize the form input variables
    this.content$.subscribe((content) => {
      this.editedTitle = content?.title;
      content?.paragraphs.forEach((paragraph, i) => {
        this.editModeParagraphTitle[i] = false;
        this.editModeContent[i] = false;
        this.editedParagraphTitle[i] = paragraph.title;
        this.editedContent[i] = paragraph.content;
      });
    });
  }

  shouldDisplayAdmin() {
    return this.sessionService
      .getCurrentSession()
      .pipe(map((s) => s?.role === ROLE.ADMIN));
  }

  cancelEdit(field: string, index?: number) {
    switch (field) {
      case 'title':
        this.cancelTitleEdit();
        break;
      case 'paragraphTitle':
        if (index !== undefined) {
          this.cancelParagraphTitleEdit(index);
        }
        break;
      case 'content':
        if (index !== undefined) {
          this.cancelContentEdit(index);
        }
        break;
      case 'all':
        this.cancelTitleEdit();
        this.editedParagraphTitle.forEach((_, i) => {
          this.cancelParagraphTitleEdit(i);
          this.cancelContentEdit(i);
        });
        break;
      default:
        break;
    }
  }
  
  private cancelTitleEdit() {
    this.editModeTitle = false;
    this.editedTitle = this.content$.getValue()?.title;
  }
  
  private cancelParagraphTitleEdit(index: number) {
    this.editModeParagraphTitle[index] = false;
    this.editedParagraphTitle[index] = this.content$.getValue()?.paragraphs[index].title!;
  }
  
  private cancelContentEdit(index: number) {
    this.editModeContent[index] = false;
    this.editedContent[index] = this.content$.getValue()?.paragraphs[index].content!;
  }
  

  save() {
    const updatedContent: CreateContent = new CreateContent(
      this.editedTitle!,
      this.editedParagraphTitle.map(
        (title, index): Paragraph => ({
          title,
          content: this.editedContent[index],
        })
      )
    );

    this.contentService.updateContent(
      this.content$.getValue()?.id!,
      updatedContent
    );

    this.closeAllEditors();
  }

  private closeAllEditors() {
    this.editModeTitle = false;
    this.editModeContent.fill(false)
    this.editModeParagraphTitle.fill(false)
  }
}
