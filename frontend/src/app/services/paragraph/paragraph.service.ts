import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, retry } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Paragraph } from './dto/paragraph.dto';
import { env } from '../../../env/env';
import { CreateParagraph } from './dto/create-paragraph.dto';
import { UpdateParagraph } from './dto/update-paragraph.dto';
import { ContentService } from '../content/content.service';


@Injectable({
  providedIn: 'root',
})
export class ParagraphService {
  private paragraphs$: BehaviorSubject<Paragraph[]> = new BehaviorSubject<
    Paragraph[]
  >([]);

  private paragraphUrl: string | undefined;

  private projectId$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  constructor(private http: HttpClient) {
    this.projectId$.subscribe({
      next: (projectId) => {
        this.paragraphUrl = this.getParagraphUrlForProject(projectId!);
        this.refreshParagraphs();
      },
    });
  }

  setProjectId(projectId: string | undefined) {
    this.projectId$.next(projectId);
  }

  private getParagraphUrlForProject(projectId: string) {
    if (!env.backend) {
      console.error(`No env found.`);
      return;
    }

    return (
      env.backend!.protocol +
      '://' +
      env.backend!.host +
      '/' +
      env.backend!.endpoints.project +
      '/' +
      projectId +
      '/' +
      env.backend!.endpoints.paragraph
    );
  }

  getParagraphs() {
    return this.paragraphs$;
  }

  private refreshParagraphs() {
    if (this.paragraphUrl) {

      console.log(`Refresh paragraphs to ${this.paragraphUrl}`);
      

      this.http.get<Paragraph[]>(this.paragraphUrl!).subscribe({
        next: (res) => {
          console.log(res);
          this.paragraphs$.next(res);
        },
        error: (e) => {
          console.error(e);
        },
      });
    } else {
      this.paragraphs$.next([]);
    }
  }

  createParagraphs(projectId: string, paragraphs: CreateParagraph[]) {
      paragraphs
        .map((paragraph) => {
          return firstValueFrom(
            this.http
              .post<Paragraph>(this.getParagraphUrlForProject(projectId)!, paragraph)
              .pipe(retry(3))
          );
        })
        .forEach(async (request) => {
          await request;
        });
      console.log(`Refresh paragraphs`);
      this.refreshParagraphs();
  }

  updateParagraph(id: string, paragraphUpdate: UpdateParagraph) {
    if (this.paragraphUrl) {
      this.http
        .patch(this.paragraphUrl! + '/' + id, paragraphUpdate)
        .subscribe({
          next: () => {
            console.log(`Refresh paragraphs`);
            this.refreshParagraphs();
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
