import { Component } from '@angular/core';
import { ContentService } from '../services/content/content.service';
import { Router } from '@angular/router';
import { SessionService } from '../services/session/session.service';
import { map } from 'rxjs';
import { ROLE } from '../services/session/dto/session.dto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  host: {
    class: 'mb-5'
  }
})
export class HeaderComponent {
  constructor(private contentService: ContentService, private router: Router, private sessionService: SessionService) {}

  getContentService() {
    return this.contentService;
  }

  showAdminButtons() {
    return this.sessionService.getCurrentSession().pipe(
      map(
        s => s?.role === ROLE.ADMIN
      )
    )
  }

  getContentIdToBold() {
    if (this.router.url.includes("projects/")) {
      return this.contentService.getSelectedContent().getValue()?.id
    }
    return undefined;
  }

  selectContent(contentId: string) {
    this.contentService.selectContent(contentId);
    this.navigate(["projects", contentId])
  }

  navigate(route: string[]) {
    this.router.navigate(route);
  }
}
