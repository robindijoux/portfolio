import { Component } from '@angular/core';
import { Content } from '../services/content/dto/content.dto';
import { BehaviorSubject, map } from 'rxjs';
import { ContentService } from '../services/content/content.service';
import { SessionService } from '../services/session/session.service';
import { ROLE } from '../services/session/dto/session.dto';
import { UpdateContent } from '../services/content/dto/update-content.dto';
import { UpdateParagraph } from '../services/paragraph/dto/update-paragraph.dto';
import { ParagraphService } from '../services/paragraph/paragraph.service';
import { Paragraph } from '../services/paragraph/dto/paragraph.dto';

interface ParagraphEdit {
  id: string;
  title: ParagraphEditField;
  content: ParagraphEditField;
}

interface ParagraphEditField {
  value: string;
  editMode: boolean;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass'],
})
export class ContentComponent {
  content$: BehaviorSubject<Content | undefined>;
  paragraphs$: BehaviorSubject<Paragraph[]>;

  editModeTitle = false;
  editedTitle?: string;

  // Declare arrays or maps for form inputs
  paragraphsEdit: ParagraphEdit[] = [];

  constructor(
    private contentService: ContentService,
    private paragraphService: ParagraphService,
    private sessionService: SessionService
  ) {
    this.content$ = this.contentService.getSelectedContent();
    this.paragraphs$ = this.paragraphService.getParagraphs();
    // Fetch the content data and initialize the form input variables
    this.content$.subscribe((content) => {
      this.editedTitle = content?.title;
    });

    this.paragraphs$.subscribe((paragraphs) => {
      paragraphs.forEach((paragraph, i) => {
        this.paragraphsEdit[i] = {
          id: paragraph.id,
          title: {
            value: paragraph.title,
            editMode: false,
          },
          content: {
            value: paragraph.content,
            editMode: false,
          },
        };
      });
    });
  }

  shouldDisplayAdmin() {
    return this.sessionService
      .getCurrentSession()
      .pipe(map((s) => s?.role === ROLE.ADMIN));
  }

  getParagraphEditById(paragraphId: string) {
    return this.paragraphsEdit.find((p) => p.id === paragraphId);
  }

  cancelEditTitle() {
    this.editModeTitle = false;
    this.editedTitle = this.content$.getValue()?.title;
  }

  cancelEditParagraph(paragraphId: string, fieldName?: keyof ParagraphEdit) {
    let paragraphEdit = this.paragraphsEdit.find((p) => p.id === paragraphId);
    if (!paragraphEdit) {
      console.error(`cancelEdit: paragraphId ${paragraphId} is not valid.`);
      return;
    }

    if (
      fieldName &&
      fieldName !== 'id' &&
      !Object.keys(paragraphEdit).includes(fieldName)
    ) {
      console.error(`
        cancelEdit: fieldName ${fieldName} is not valid.
      `);
      return;
    }

    const baseValue = this.paragraphs$
      .getValue()
      ?.find((p) => p.id === paragraphId);
    if (baseValue) {
      if (!fieldName) {
        paragraphEdit.title.editMode = false;
        paragraphEdit.content.editMode = false;
        paragraphEdit.title.value = baseValue.title;
        paragraphEdit.content.value = baseValue.content;
      } else {
        (paragraphEdit![fieldName] as ParagraphEditField).editMode = false;
        (paragraphEdit![fieldName] as ParagraphEditField).value =
          baseValue[fieldName];
      }
    }
  }

  save() {

    if (this.editModeTitle) {
      this.contentService.updateContent(
        this.content$.getValue()?.id!,
        {
          title: this.editedTitle, 
        }
      )
    }

    this.paragraphsEdit.filter(
      (p) => p.title.editMode || p.content.editMode
    ).forEach((p) => {
        let newParagraph: UpdateParagraph = {};
        if (p.title.editMode) {
          newParagraph.title = p.title.value;
        }
        if (p.content.editMode) {
          newParagraph.content = p.content.value;
        }
        
        this.paragraphService.updateParagraph(p.id, newParagraph);
    });

    this.closeAllEditors();
  }

  private closeAllEditors() {
    this.editModeTitle = false;
    this.paragraphsEdit.forEach((p) => {
      p.title.editMode = false;
      p.content.editMode = false;
    });
  }
}
