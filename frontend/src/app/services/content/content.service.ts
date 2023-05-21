import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Content } from './dto/content.dto';
import { BehaviorSubject } from 'rxjs';
import { CreateContent } from './dto/create-content.dto';
import { env } from '../../../env/env';
import { UpdateContent } from './dto/update-content.dto';
import { CreateParagraph } from '../paragraph/dto/create-paragraph.dto';
import { ParagraphService } from '../paragraph/paragraph.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private contents$: BehaviorSubject<Content[]> = new BehaviorSubject<
    Content[]
  >([]);
  private selectedContent$: BehaviorSubject<Content | undefined> =
    new BehaviorSubject<Content | undefined>(undefined);

  private projectUrl?: string;

  constructor(private http: HttpClient, private paragraphService: ParagraphService) {
    this.selectedContent$.subscribe({
      next: (content) => {
          this.paragraphService.setProjectId(content?.id!);
      }
    })
    if (env.backend) {
      this.projectUrl =
        env.backend!.protocol +
        '://' +
        env.backend!.host +
        '/' +
        env.backend!.endpoints.project;
    }
    this.refreshContent();
  }

  getAllContent() {
    return this.contents$;
  }

  getSelectedContent() {
    return this.selectedContent$;
  }

  private refreshContent() {
    if (this.projectUrl) {
      console.log(`URL: ${this.projectUrl}`);
      this.http.get<Content[]>(this.projectUrl).subscribe({
        next: (res) => {
          console.log(res);
          this.contents$.next(res);

          if (this.selectedContent$.getValue()) {
            this.selectContent(this.selectedContent$.getValue()!.id);
          }
        },
        error: (e) => {
          console.error(e);
        },
      });
    } else {
      console.error(`No env found.`);
    }
  }

  selectContent(contentId: string) {
    let filtered = this.contents$
      .getValue()
      .find((content) => content.id === contentId);

    if (filtered) {
      this.selectedContent$.next(filtered);
    } else {
      this.selectedContent$.next(undefined);
      console.error('No content with id', contentId);
    }

    
  }

  createContent(title: string, paragraphs: CreateParagraph[]) {
    const createContent = new CreateContent(title, paragraphs);
    if (this.projectUrl) {
      this.http.post<Content>(this.projectUrl, createContent).subscribe({
        next: (res) => {
          console.log(res);
          this.refreshContent();
          this.paragraphService.createParagraphs(res.id,paragraphs);
        },
        error: (e) => {
          console.error(e);
        },
      });
    } else {
      console.error(`No URL`);
    }
  }

  updateContent(id: string, contentUpdate: UpdateContent) {
    if (this.projectUrl) {
      this.http.patch(this.projectUrl + '/' + id, contentUpdate).subscribe({
        next: () => {
          this.refreshContent();
        },
        error: (e) => {
          console.error(e);
        },
      });
    } else {
      console.error(`No URL`);
    }
  }
}
