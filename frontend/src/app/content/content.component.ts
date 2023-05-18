import { Component, Input } from '@angular/core';
import { Content } from '../services/content/dto/content.dto';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ContentService } from '../services/content/content.service';
import { SessionService } from '../services/session/session.service';
import { ROLE } from '../services/session/dto/session.dto';
import { Paragraph } from '../services/content/dto/paragraph.dto';
import { CreateContent } from '../services/content/dto/create-content.dto';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass'],
  host: {
    class: 'mt-5 border-primary flex-fill'
  }
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

  constructor(private contentService: ContentService, private sessionService: SessionService) {
    this.content$ = this.contentService.getSelectedContent();
    // Fetch the content data and initialize the form input variables
    this.content$.subscribe(content => {
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
    return this.sessionService.getCurrentSession().pipe(
      map(
        s=>s?.role===ROLE.ADMIN
      )
    )
  }

cancelEdit(field: string, index?: number) {
  if (field === 'title') {
    this.editModeTitle = false;
    this.editedTitle = this.content$.getValue()?.title
  } else if (field === 'paragraphTitle') {
    // Cancel editing the paragraph title
    this.editModeParagraphTitle[index!] = false;
    this.editedParagraphTitle[index!] = this.content$.getValue()?.paragraphs[index!].title!
  } else if (field === 'content') {
    // Cancel editing the content
    this.editModeContent[index!] = false;
    this.editedContent[index!] = this.content$.getValue()?.paragraphs[index!].content!
  }
}

save() {
  const updatedContent: CreateContent = new CreateContent(
    this.editedTitle!,
    this.editedParagraphTitle.map(
      (title, index): Paragraph => ({
        title,
        content: this.editedContent[index]
      })
    )
  )

  window.alert(JSON.stringify(updatedContent));
}

}
