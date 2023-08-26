import { Component } from '@angular/core';
import { Project } from '../services/project/dto/project.dto';
import { BehaviorSubject, map } from 'rxjs';
import { ProjectService } from '../services/project/project.service';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass'],
})
export class ProjectComponent {

  project$: BehaviorSubject<Project | undefined>;

  editModeTitle = false;
  editedTitle?: string;
  editedHtmlContent?: string;

  constructor(
    private projectService: ProjectService,
    private sessionService: SessionService
  ) {
    this.project$ = this.projectService.getSelectedProject();

    this.project$.subscribe((project) => {
      console.log('project changed', project);
      this.editedTitle = project?.title;
      this.editedHtmlContent = project?.htmlContent;
    });
  }

  shouldDisplayAdmin() {
    return this.sessionService
      .getCurrentSession()
      .pipe(map((s) => s !== undefined));
  }

  cancelEditTitle() {
    this.editModeTitle = false;
    this.editedTitle = this.project$.getValue()?.title;
  }

  save() {
    console.log('saving project', this.project$.getValue());
    

    let project = this.project$.getValue();

    if (project === undefined) {
      return;
    }

    this.projectService.updateProject(
      project.id,
      {
        title: this.editedTitle,
        htmlContent: this.editedHtmlContent,
      }
    )

    this.closeAllEditors();
  }

  private closeAllEditors() {
    this.editModeTitle = false;
  }

  deleteProject() {
    console.log('delete project');
    this.projectService.deleteProject(this.project$.getValue()!.id);
  }
}
