import { Component } from '@angular/core';
import { ProjectService } from '../services/project/project.service';
import { Router } from '@angular/router';
import { SessionService } from '../services/session/session.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  host: {
    class: 'mb-5'
  }
})
export class HeaderComponent {
  loginData: {
    username: string | undefined;
    password: string | undefined;
  } = {
    username: undefined,
    password: undefined
  }

  constructor(private projectService: ProjectService, private router: Router, private sessionService: SessionService) {}

  getProjectService() {
    return this.projectService;
  }

  showAdminButtons() {
    return this.sessionService.getCurrentSession().pipe(
      map(
        s => s !== undefined
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

  login() {
    if (!this.loginData.username || !this.loginData.password) {
      console.error("login: username or password is undefined.");
      return;
    }
    this.sessionService.login(this.loginData.username!, this.loginData.password!);
  }

  logout() {
    this.sessionService.logout();
  }
}
