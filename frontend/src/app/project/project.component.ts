import { Component } from '@angular/core';
import { Project } from '../services/project/dto/project.dto';
import { BehaviorSubject, map } from 'rxjs';
import { ProjectService } from '../services/project/project.service';
import { SessionService } from '../services/session/session.service';
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
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass'],
})
export class ProjectComponent {
  project$: BehaviorSubject<Project | undefined>;
  paragraphs$: BehaviorSubject<Paragraph[]>;

  editModeTitle = false;
  editedTitle?: string;

  // Declare arrays or maps for form inputs
  paragraphsEdit: ParagraphEdit[] = [];

  constructor(
    private projectService: ProjectService,
    private paragraphService: ParagraphService,
    private sessionService: SessionService
  ) {
    this.project$ = this.projectService.getSelectedProject();
    this.paragraphs$ = this.paragraphService.getParagraphs();

    this.project$.subscribe((project) => {
      this.editedTitle = project?.title;
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
      .pipe(map((s) => s !== undefined));
  }

  getParagraphEditById(paragraphId: string) {
    return this.paragraphsEdit.find((p) => p.id === paragraphId);
  }

  cancelEditTitle() {
    this.editModeTitle = false;
    this.editedTitle = this.project$.getValue()?.title;
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
      this.projectService.updateProject(
        this.project$.getValue()?.id!,
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
