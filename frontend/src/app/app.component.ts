import { Component } from '@angular/core';
import { ContentService } from './services/content/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'frontend';

  constructor(private contentService: ContentService) {

  }

  getSelectedContent() {
    return this.contentService.getSelectedContent();
  }
}
