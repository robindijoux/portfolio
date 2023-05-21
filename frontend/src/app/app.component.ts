import { Component } from '@angular/core';
import { ProjectService } from './services/project/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'frontend';

  constructor(private projectService: ProjectService) {

  }

  getSelectedProject() {
    return this.projectService.getSelectedProject();
  }
}
