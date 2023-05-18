import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Content } from './dto/content.dto';
import { BehaviorSubject } from 'rxjs';
import { CreateContent } from './dto/create-content.dto';
import { Paragraph } from './dto/paragraph.dto';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private mock: Content[] = [
    {
      id: '1',
      title: '🚀 Sample project 1',
      paragraphs: [
        {
          id: "p11",
          title: 'Parag 1',
          content: 'Content 1',
        },
        {
          id: "p11",
          title: 'Parag 2',
          content: 'Content 2',
        },
      ],
    },
    {
      id: '2',
      title: '📱 Sample project 2',
      paragraphs: [
        {
          id: "p21",
          title: 'Parag 1',
          content: 'Content 1',
        },
        {
          id: "p22",
          title: 'Parag 2',
          content: 'Content 2',
        },
      ],
    },
  ];

  private contents$: BehaviorSubject<Content[]> = new BehaviorSubject<
    Content[]
  >([]);
  private selectedContent$: BehaviorSubject<Content | undefined> =
    new BehaviorSubject<Content | undefined>(undefined);

  constructor(private http: HttpClient) {
    this.refreshContent();
  }

  getAllContent() {
    return this.contents$;
  }

  getSelectedContent() {
    return this.selectedContent$;
  }

  private refreshContent() {
    this.contents$.next(this.mock);
    this.selectedContent$.next(this.mock[0]);
  }

  selectContent(contentId: string) {
    let filtered = this.contents$
      .getValue()
      .filter((content) => content.id === contentId);

    if (filtered.length > 0) {
      this.selectedContent$.next(filtered[0]);
    } else {
      console.error('No content with id', contentId);
    }
  }

  createContent(title: string, paragraphs: Paragraph[]) {
    const createContent = new CreateContent(title, paragraphs);
    // TODO http
    const newContent: Content = {
      id: new Date().toString(),
      title,
      paragraphs,
    };
    let contents = this.contents$.getValue();
    contents.push(newContent);
    this.contents$.next(contents);
    console.log('New content created!', contents);
  }

  updateContent(id: string, contentUpdate: CreateContent) {
    let prevContents = this.contents$.getValue();
    let prevTargetIndex = prevContents.findIndex(
      (content) => content.id === id
    );

    if (prevTargetIndex > -1) {
      const updatedContent: Content = {
        id,
        ...contentUpdate,
      }
      prevContents[prevTargetIndex] = updatedContent
      this.contents$.next(prevContents);
      if (this.selectedContent$.getValue()?.id === id) {
        this.selectContent(id);
      }
    }
  }
}
