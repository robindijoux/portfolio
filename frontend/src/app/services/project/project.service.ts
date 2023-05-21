import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './dto/project.dto';
import { BehaviorSubject } from 'rxjs';
import { CreateProject } from './dto/create-project.dto';
import { env } from '../../../env/env';
import { UpdateProject } from './dto/update-project.dto';
import { CreateParagraph } from '../paragraph/dto/create-paragraph.dto';
import { ParagraphService } from '../paragraph/paragraph.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects$: BehaviorSubject<Project[]> = new BehaviorSubject<
    Project[]
  >([]);
  private selectedProjects$: BehaviorSubject<Project | undefined> =
    new BehaviorSubject<Project | undefined>(undefined);

  private projectUrl?: string;

  constructor(private http: HttpClient, private paragraphService: ParagraphService) {
    this.selectedProjects$.subscribe({
      next: (project) => {
          this.paragraphService.setProjectId(project?.id!);
      }
    })
    if (env.backend) {
      this.projectUrl =
        env.backend!.protocol +
        '://' +
        env.backend!.host +
        '/' +
        env.backend!.endpoints.project;
    }
    this.refreshProjects();
  }

  getAllProjects() {
    return this.projects$;
  }

  getSelectedProject() {
    return this.selectedProjects$;
  }

  private refreshProjects() {
    if (this.projectUrl) {
      console.log(`URL: ${this.projectUrl}`);
      this.http.get<Project[]>(this.projectUrl).subscribe({
        next: (res) => {
          console.log(res);
          this.projects$.next(res);

          if (this.selectedProjects$.getValue()) {
            this.selectProject(this.selectedProjects$.getValue()!.id);
          }
        },
        error: (e) => {
          console.error(e);
        },
      });
    } else {
      console.error(`No env found.`);
    }
  }

  selectProject(projectId: string) {
    let filtered = this.projects$
      .getValue()
      .find((project) => project.id === projectId);

    if (filtered) {
      this.selectedProjects$.next(filtered);
    } else {
      this.selectedProjects$.next(undefined);
      console.error('No project with id', projectId);
    }

    
  }

  createProject(title: string, paragraphs: CreateParagraph[]) {
    const createProject = new CreateProject(title, paragraphs);
    if (this.projectUrl) {
      this.http.post<Project>(this.projectUrl, createProject).subscribe({
        next: (res) => {
          console.log(res);
          this.refreshProjects();
          this.paragraphService.createParagraphs(res.id,paragraphs);
        },
        error: (e) => {
          console.error(e);
        },
      });
    } else {
      console.error(`No URL`);
    }
  }

  updateProject(id: string, projectUpdate: UpdateProject) {
    if (this.projectUrl) {
      this.http.patch(this.projectUrl + '/' + id, projectUpdate).subscribe({
        next: () => {
          this.refreshProjects();
        },
        error: (e) => {
          console.error(e);
        },
      });
    } else {
      console.error(`No URL`);
    }
  }
}
