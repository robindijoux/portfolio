import { Component } from '@angular/core';
import { ProjectService } from '../services/project/project.service';
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
  constructor(private projectService: ProjectService, private router: Router, private sessionService: SessionService) {}

  getProjectService() {
    return this.projectService;
  }

  showAdminButtons() {
    return this.sessionService.getCurrentSession().pipe(
      map(
        s => s?.role === ROLE.ADMIN
      )
    )
  }

  getProjectIdToBold() {
    if (this.router.url.includes("projects/")) {
      return this.projectService.getSelectedProject().getValue()?.id
    }
    return undefined;
  }

  selectProject(projectId: string) {
    this.projectService.selectProject(projectId);
    this.navigate(["projects", projectId])
  }

  navigate(route: string[]) {
    this.router.navigate(route);
  }
}
