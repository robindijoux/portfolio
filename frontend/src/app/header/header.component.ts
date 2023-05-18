import { Component } from '@angular/core';
import { ContentService } from '../services/content/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  host: {
    class: 'mb-5'
  }
})
export class HeaderComponent {
  constructor(private contentService: ContentService, private router: Router) {}

  getContentService() {
    return this.contentService;
  }

  getContentIdToBold() {
    if (this.router.url.includes("projects/")) {
      return this.contentService.getSelectedContent().getValue()?.id
    }
    return undefined;
  }

  onClick(contentId: string) {
    this.contentService.selectContent(contentId);
    this.router.navigate(["projects", contentId])
  }
}
