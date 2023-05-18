import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Content } from './dto/content.dto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private mock: Content[] = [
    {
      id: "1",
      title: "🚀 Sample project 1",
      paragraphs: [
        {
          title: "Parag 1",
          content: "Content 1"
        },
        {
          title: "Parag 2",
          content: "Content 2"
        }
      ]
    },
    {
      id: "2",
      title: "📱 Sample project 2",
      paragraphs: [
        {
          title: "Parag 1",
          content: "Content 1"
        },
        {
          title: "Parag 2",
          content: "Content 2"
        }
      ]
    }
  ]

  private contents$: BehaviorSubject<Content[]> = new BehaviorSubject<Content[]>([]);
  private selectedContent$: BehaviorSubject<Content | undefined> = new BehaviorSubject<Content | undefined>(undefined); 

  constructor(private http: HttpClient) {
    this.refreshContent()
  }

  getAllContent() {
    return this.contents$;
  }

  getSelectedContent() {
    return this.selectedContent$;
  }

  private refreshContent() {
    this.contents$.next(
      this.mock
    )
    this.selectedContent$.next(this.mock[0])
  }

  selectContent(contentId: string) {
    let filtered = this.contents$.getValue().filter(
      content => content.id === contentId
    )

    if (filtered.length > 0) {
      this.selectedContent$.next(
        filtered[0]
      )
    } else {
      console.error("No content with id", contentId);
    }
  }
}
