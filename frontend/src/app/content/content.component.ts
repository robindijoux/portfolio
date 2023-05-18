import { Component, Input } from '@angular/core';
import { Content } from '../services/content/dto/content.dto';
import { Observable } from 'rxjs';
import { ContentService } from '../services/content/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass'],
  host: {
    class: 'mt-5 border-primary flex-fill'
  }
})
export class ContentComponent {
  content$: Observable<Content | undefined>;

  constructor(private contentService: ContentService) {
    this.content$ = this.contentService.getSelectedContent();
  }
}
